import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { quoteRequests } from "@/db/schema";

const updateQuoteSchema = z.object({
  status: z
    .enum([
      "received",
      "reviewing",
      "estimate_sent",
      "scheduled",
      "in_bay",
      "completed",
    ])
    .optional(),
  shopNotes: z.string().trim().max(1000).optional(),
  estimatedQuote: z.string().trim().max(80).optional(),
});

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return NextResponse.json({ error: "Invalid quote ID." }, { status: 400 });
    }

    const body = await request.json();
    const parsed = updateQuoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid quote update payload." },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(quoteRequests)
      .set({
        ...(parsed.data.status !== undefined
          ? { status: parsed.data.status }
          : {}),
        ...(parsed.data.shopNotes !== undefined
          ? { shopNotes: parsed.data.shopNotes }
          : {}),
        ...(parsed.data.estimatedQuote !== undefined
          ? { estimatedQuote: parsed.data.estimatedQuote }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(quoteRequests.id, numericId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    }

    return NextResponse.json({ quote: updated });
  } catch (error) {
    console.error("PATCH /api/quotes/[id] error:", error);
    return NextResponse.json(
      { error: "Unable to update quote." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return NextResponse.json({ error: "Invalid quote ID." }, { status: 400 });
    }

    const [deleted] = await db
      .delete(quoteRequests)
      .where(eq(quoteRequests.id, numericId))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    }

    return NextResponse.json({ deletedId: deleted.id });
  } catch (error) {
    console.error("DELETE /api/quotes/[id] error:", error);
    return NextResponse.json(
      { error: "Unable to remove quote." },
      { status: 500 }
    );
  }
}
