import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { studioBuilds } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import {
  calculateIllustrativeEstimate,
  PAINT_SWATCHES,
} from "@/lib/studio-config";

const createBuildSchema = z.object({
  vehicleType: z.enum(["sedan", "coupe", "suv", "pickup"]),
  paintName: z.string().trim().min(2).max(80),
  paintHex: z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/),
  finishType: z.enum(["gloss", "satin", "matte", "color-shift"]),
  tintVlt: z.number().int().min(5).max(80),
  ppfCoverage: z.enum([
    "none",
    "partial_front",
    "full_front",
    "track_pack",
    "full_vehicle",
  ]),
  ceramicAddon: z.boolean().default(false),
  notes: z.string().trim().max(400).optional().default(""),
});

function generateBuildCode() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `EAS-${randomDigits}`;
}

export async function GET(request: NextRequest) {
  try {
    await ensureSeeded();
    const code = request.nextUrl.searchParams.get("code")?.trim().toUpperCase();

    if (code) {
      const [found] = await db
        .select()
        .from(studioBuilds)
        .where(eq(studioBuilds.buildCode, code))
        .limit(1);

      if (!found) {
        return NextResponse.json(
          { error: `No studio build found matching code ${code}.` },
          { status: 404 }
        );
      }
      return NextResponse.json({ build: found });
    }

    const builds = await db
      .select()
      .from(studioBuilds)
      .orderBy(desc(studioBuilds.createdAt))
      .limit(20);

    return NextResponse.json({ builds });
  } catch (error) {
    console.error("GET /api/studio-builds error:", error);
    return NextResponse.json(
      { error: "Unable to retrieve saved studio builds." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureSeeded();
    const body = await request.json();
    const parsed = createBuildSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid vehicle studio configuration.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const swatch = PAINT_SWATCHES.find(
      (s) => s.hex.toLowerCase() === parsed.data.paintHex.toLowerCase()
    );
    const estimate = calculateIllustrativeEstimate({
      vehicleType: parsed.data.vehicleType,
      finishType: parsed.data.finishType,
      ppfCoverage: parsed.data.ppfCoverage,
      tintVlt: parsed.data.tintVlt,
      ceramicAddon: parsed.data.ceramicAddon,
      includeWrap: swatch?.isWrapUpgrade ?? false,
    });

    let buildCode = generateBuildCode();
    // Ensure uniqueness with quick retry if needed
    for (let attempt = 0; attempt < 4; attempt++) {
      const existing = await db
        .select({ id: studioBuilds.id })
        .from(studioBuilds)
        .where(eq(studioBuilds.buildCode, buildCode))
        .limit(1);
      if (existing.length === 0) break;
      buildCode = generateBuildCode();
    }

    const [created] = await db
      .insert(studioBuilds)
      .values({
        buildCode,
        vehicleType: parsed.data.vehicleType,
        paintName: parsed.data.paintName,
        paintHex: parsed.data.paintHex,
        finishType: parsed.data.finishType,
        tintVlt: parsed.data.tintVlt,
        ppfCoverage: parsed.data.ppfCoverage,
        ceramicAddon: parsed.data.ceramicAddon,
        estimatedMin: estimate.min,
        estimatedMax: estimate.max,
        notes: parsed.data.notes,
      })
      .returning();

    return NextResponse.json({ build: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/studio-builds error:", error);
    return NextResponse.json(
      { error: "Unable to save your vehicle studio build." },
      { status: 500 }
    );
  }
}
