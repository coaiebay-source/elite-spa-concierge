import React from "react";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { services, projects } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { ServiceDetailClient } from "@/components/ServiceDetailClient";

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await ensureSeeded();
  const { slug } = await params;

  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  if (!service) {
    notFound();
  }

  const [allServices, allProjects] = await Promise.all([
    db.select().from(services).orderBy(asc(services.sortOrder)),
    db.select().from(projects).orderBy(asc(projects.sortOrder)),
  ]);

  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  const keyword = service.shortTitle.toLowerCase().split(" ")[0];
  const relatedProjects = allProjects
    .filter(
      (p) =>
        p.serviceCategory.toLowerCase().includes(keyword) ||
        p.servicesApplied.some((sa) => sa.toLowerCase().includes(keyword))
    )
    .slice(0, 2);

  return (
    <ServiceDetailClient
      service={service}
      otherServices={otherServices}
      relatedProjects={relatedProjects}
    />
  );
}
