import React from "react";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import {
  services,
  projects,
  testimonials,
  studioBuilds,
} from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import {
  HeroSection,
  ServicesGridSection,
  ServiceAreaSection,
  FaqAndFinalCtaSection,
} from "@/components/HomeSections";
import { VehicleStudio } from "@/components/VehicleStudio";
import { PaintCorrectionReveal } from "@/components/PaintCorrectionReveal";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { TestimonialsAndReviews } from "@/components/TestimonialsAndReviews";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureSeeded();

  const [serviceList, projectList, testimonialList, recentBuilds] =
    await Promise.all([
      db.select().from(services).orderBy(asc(services.sortOrder)),
      db.select().from(projects).orderBy(asc(projects.sortOrder)),
      db.select().from(testimonials).orderBy(desc(testimonials.createdAt)),
      db
        .select()
        .from(studioBuilds)
        .orderBy(desc(studioBuilds.createdAt))
        .limit(12),
    ]);

  return (
    <div className="bg-[#06070A]">
      <HeroSection />
      <VehicleStudio initialBuilds={recentBuilds} />
      <ServicesGridSection services={serviceList} />
      <PaintCorrectionReveal />
      <PortfolioShowcase projects={projectList} />
      <TestimonialsAndReviews initialTestimonials={testimonialList} />
      <ServiceAreaSection />
      <FaqAndFinalCtaSection />
    </div>
  );
}
