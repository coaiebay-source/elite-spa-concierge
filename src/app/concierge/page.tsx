import React from "react";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { quoteRequests, studioBuilds } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { ConciergePortalClient } from "@/components/ConciergePortalClient";

export const dynamic = "force-dynamic";

export default async function ConciergePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  await ensureSeeded();
  const resolvedParams = await searchParams;

  const [quotesList, buildsList] = await Promise.all([
    db
      .select()
      .from(quoteRequests)
      .orderBy(desc(quoteRequests.createdAt))
      .limit(50),
    db
      .select()
      .from(studioBuilds)
      .orderBy(desc(studioBuilds.createdAt))
      .limit(20),
  ]);

  return (
    <ConciergePortalClient
      initialQuotes={quotesList}
      initialBuilds={buildsList}
      initialLookupCode={resolvedParams.code ?? ""}
    />
  );
}
