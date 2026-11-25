import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export async function GET(request: NextRequest) {
  try {
    await ensureSeeded();
    const category = request.nextUrl.searchParams.get("category");

    const list =
      category && category !== "All"
        ? await db
            .select()
            .from(projects)
            .where(eq(projects.serviceCategory, category))
            .orderBy(asc(projects.sortOrder))
        : await db.select().from(projects).orderBy(asc(projects.sortOrder));

    return NextResponse.json({ projects: list });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Unable to load showcase projects." },
      { status: 500 }
    );
  }
}
