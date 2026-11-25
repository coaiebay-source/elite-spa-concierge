import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

const createTestimonialSchema = z.object({
  clientName: z.string().trim().min(2, "Please enter your name").max(80),
  vehicle: z.string().trim().min(3, "Please enter your vehicle").max(100),
  serviceName: z.string().trim().min(2, "Please select a service").max(100),
  location: z.string().trim().min(2, "Please enter your city").max(80),
  rating: z.number().int().min(1).max(5).default(5),
  quote: z
    .string()
    .trim()
    .min(15, "Please share a few words about your experience")
    .max(600),
});

export async function GET() {
  try {
    await ensureSeeded();
    const list = await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
    return NextResponse.json({ testimonials: list });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Unable to load client impressions." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureSeeded();
    const body = await request.json();
    const parsed = createTestimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check the required review fields.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const [created] = await db
      .insert(testimonials)
      .values({
        ...parsed.data,
        verified: false,
        featured: true,
      })
      .returning();

    return NextResponse.json({ testimonial: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Unable to save your review right now." },
      { status: 500 }
    );
  }
}
