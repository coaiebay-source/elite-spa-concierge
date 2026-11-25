import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export async function GET() {
  try {
    await ensureSeeded();
    const list = await db
      .select()
      .from(services)
      .orderBy(asc(services.sortOrder));
    return NextResponse.json({ services: list });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      { error: "Unable to load services at this time." },
      { status: 500 }
    );
  }
}
