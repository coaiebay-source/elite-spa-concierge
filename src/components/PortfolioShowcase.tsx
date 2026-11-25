"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { ProjectRecord } from "@/db/schema";
import { useQuoteModal } from "./QuoteModalProvider";

const CATEGORIES = [
  "All",
  "PPF",
  "Ceramic",
  "Window Tint",
  "Vinyl Wraps",
  "Detailing",
  "Paint Correction",
  "Restoration",
];

interface PortfolioShowcaseProps {
  projects: ProjectRecord[];
}

export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const { openQuoteModal } = useQuoteModal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(
    null
  );

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.serviceCategory === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section
      id="portfolio"
      className="relative border-t border-white/10 bg-[#07090E] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header & Filters */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A46B]/30 bg-[#C9A46B]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.24em] text-[#E7CCA0] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Studio Builds
            </span>
            <h2 className="mt-4 font-serif text-4xl font-medium text-[#F5F2EB] sm:text-5xl">
              A closer look at{" "}
              <span className="italic text-gold-gradient">the finish.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA2B2] sm:text-base">
              Selected protection, bespoke color-change wraps, ceramic seals,
              and collector revivals completed for Boerne and San Antonio
              enthusiasts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                    active
                      ? "border-[#C9A46B] bg-[#C9A46B] text-[#06070A] font-semibold"
                      : "border-white/10 bg-white/[0.03] text-[#9AA2B2] hover:border-white/25 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry-Inspired Showcase Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((project, index) => {
            const isHeroSpan = activeCategory === "All" && index === 0;
            return (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0D1119] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A46B]/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.6)] ${
                  isHeroSpan ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    isHeroSpan ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/35 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full border border-[#C9A46B]/45 bg-black/75 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#E7CCA0] uppercase backdrop-blur-md">
                      {project.serviceCategory}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>

                  <div className="absolute inset-x-5 bottom-5">
                    <p className="text-[11px] font-medium tracking-[0.18em] text-[#C9A46B] uppercase">
                      {project.year} {project.vehicle}
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-medium text-[#F5F2EB] sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#B6BDCA]">
                      {project.finishSummary}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Editorial Project Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-lg sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/12 bg-[#0B0F17] shadow-2xl lg:grid-cols-12">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close build dossier"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:border-[#C9A46B] hover:text-[#E7CCA0]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative min-h-[260px] lg:col-span-6 lg:min-h-[460px]">
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B0F17]/40" />
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6">
              <div>
                <span className="inline-block rounded-full border border-[#C9A46B]/40 bg-[#C9A46B]/10 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-[#E7CCA0] uppercase">
                  {selectedProject.serviceCategory} Dossier
                </span>
                <p className="mt-3 text-xs font-medium tracking-[0.16em] text-[#9AA2B2] uppercase">
                  {selectedProject.year} {selectedProject.vehicle}
                </p>
                <h3 className="mt-1 font-serif text-3xl font-medium text-[#F5F2EB]">
                  {selectedProject.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#9AA2B2]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#C9A46B]" />
                    {selectedProject.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#C9A46B]" />
                    Turnaround: {selectedProject.turnaround}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#C2C7D1]">
                  {selectedProject.notes}
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-[#C9A46B] uppercase">
                    Treatments Performed
                  </p>
                  <ul className="mt-3 space-y-2">
                    {selectedProject.servicesApplied.map((srv) => (
                      <li
                        key={srv}
                        className="flex items-center gap-2.5 text-xs text-[#E4E7EE]"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#C9A46B]" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const proj = selectedProject;
                    setSelectedProject(null);
                    openQuoteModal({
                      notes: `Inspired by studio build: ${proj.title} (${proj.servicesApplied.join(", ")})`,
                    });
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C9A46B] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84]"
                >
                  Request Similar Build
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
