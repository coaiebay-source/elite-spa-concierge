import { NextRequest, NextResponse } from "next/server";
import { desc, eq, ilike } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { quoteRequests, studioBuilds } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

const createQuoteSchema = z.object({
  studioBuildCode: z.string().trim().max(30).nullable().optional(),
  clientName: z.string().trim().min(2, "Please provide your name").max(100),
  clientEmail: z.string().trim().email("Please enter a valid email address"),
  clientPhone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  preferredContact: z.enum(["call", "text", "email"]).default("text"),
  vehicleYear: z.string().trim().min(4, "Enter vehicle year").max(10),
  vehicleMake: z.string().trim().min(2, "Enter vehicle make").max(60),
  vehicleModel: z.string().trim().min(1, "Enter vehicle model").max(80),
  vehicleBodyType: z
    .enum(["sedan", "coupe", "suv", "pickup", "other"])
    .default("coupe"),
  servicesRequested: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one restyling service"),
  serviceLocation: z
    .enum(["boerne_showroom", "mobile_boerne", "mobile_san_antonio"])
    .default("boerne_showroom"),
  preferredDate: z.string().trim().max(80).optional().default(""),
  budgetRange: z.string().trim().max(60).optional().default("Undecided"),
  notes: z.string().trim().max(1000).optional().default(""),
});

function generateQuoteCode() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `QTE-${randomDigits}`;
}

export async function GET(request: NextRequest) {
  try {
    await ensureSeeded();
    const code = request.nextUrl.searchParams.get("code")?.trim().toUpperCase();
    const email = request.nextUrl.searchParams.get("email")?.trim();

    if (code) {
      const [found] = await db
        .select()
        .from(quoteRequests)
        .where(eq(quoteRequests.quoteCode, code))
        .limit(1);

      if (!found) {
        return NextResponse.json(
          { error: `No quote request found for confirmation code ${code}.` },
          { status: 404 }
        );
      }

      let attachedBuild = null;
      if (found.studioBuildCode) {
        const [build] = await db
          .select()
          .from(studioBuilds)
          .where(eq(studioBuilds.buildCode, found.studioBuildCode))
          .limit(1);
        attachedBuild = build ?? null;
      }

      return NextResponse.json({ quote: found, attachedBuild });
    }

    if (email) {
      const matching = await db
        .select()
        .from(quoteRequests)
        .where(ilike(quoteRequests.clientEmail, email))
        .orderBy(desc(quoteRequests.createdAt));

      return NextResponse.json({ quotes: matching });
    }

    const list = await db
      .select()
      .from(quoteRequests)
      .orderBy(desc(quoteRequests.createdAt))
      .limit(50);

    return NextResponse.json({ quotes: list });
  } catch (error) {
    console.error("GET /api/quotes error:", error);
    return NextResponse.json(
      { error: "Unable to load quote requests right now." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureSeeded();
    const body = await request.json();
    const parsed = createQuoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please review the highlighted fields before submitting.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    let quoteCode = generateQuoteCode();
    for (let attempt = 0; attempt < 4; attempt++) {
      const existing = await db
        .select({ id: quoteRequests.id })
        .from(quoteRequests)
        .where(eq(quoteRequests.quoteCode, quoteCode))
        .limit(1);
      if (existing.length === 0) break;
      quoteCode = generateQuoteCode();
    }

    const [created] = await db
      .insert(quoteRequests)
      .values({
        quoteCode,
        studioBuildCode: parsed.data.studioBuildCode || null,
        clientName: parsed.data.clientName,
        clientEmail: parsed.data.clientEmail,
        clientPhone: parsed.data.clientPhone,
        preferredContact: parsed.data.preferredContact,
        vehicleYear: parsed.data.vehicleYear,
        vehicleMake: parsed.data.vehicleMake,
        vehicleModel: parsed.data.vehicleModel,
        vehicleBodyType: parsed.data.vehicleBodyType,
        servicesRequested: parsed.data.servicesRequested,
        serviceLocation: parsed.data.serviceLocation,
        preferredDate: parsed.data.preferredDate,
        budgetRange: parsed.data.budgetRange,
        notes: parsed.data.notes,
        status: "received",
      })
      .returning();

    return NextResponse.json({ quote: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/quotes error:", error);
    return NextResponse.json(
      { error: "Unable to submit your quote request. Please try again." },
      { status: 500 }
    );
  }
}
