"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Phone,
} from "lucide-react";
import type { ServiceRecord, ProjectRecord } from "@/db/schema";
import { BUSINESS_INFO } from "@/lib/studio-config";
import { useQuoteModal } from "./QuoteModalProvider";

interface ServiceDetailClientProps {
  service: ServiceRecord;
  otherServices: ServiceRecord[];
  relatedProjects: ProjectRecord[];
}

export function ServiceDetailClient({
  service,
  otherServices,
  relatedProjects,
}: ServiceDetailClientProps) {
  const { openQuoteModal } = useQuoteModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#06070A] pt-24">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-white/10 py-14 sm:py-20">
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#C9A46B]/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-[#9AA2B2] uppercase transition hover:text-[#E7CCA0]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Restyling Services
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#C9A46B]/40 bg-[#C9A46B]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#E7CCA0] uppercase">
                  {service.category}
                </span>
                {service.mobileEligible && (
                  <span className="rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                    Mobile Option Available
                  </span>
                )}
              </div>

              <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.06] text-[#F5F2EB] sm:text-5xl lg:text-6xl">
                {service.name}
              </h1>

              <p className="mt-4 font-serif text-xl italic text-[#E7CCA0]">
                {service.tagline}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-[#B2B9C7] sm:text-base">
                {service.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6 border-y border-white/10 py-5 text-xs">
                <div>
                  <span className="block text-[10px] tracking-[0.2em] text-[#8E95A2] uppercase">
                    Starting Investment
                  </span>
                  <span className="mt-1 block font-mono text-base font-semibold text-white">
                    {service.startingPriceLabel}
                  </span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="block text-[10px] tracking-[0.2em] text-[#8E95A2] uppercase">
                    Typical Bay Time
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white">
                    <Clock className="h-3.5 w-3.5 text-[#C9A46B]" />
                    {service.turnaroundLabel}
                  </span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="block text-[10px] tracking-[0.2em] text-[#8E95A2] uppercase">
                    Showroom
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white">
                    Boerne, TX
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      services: [service.name],
                      serviceLocation: service.mobileEligible
                        ? "mobile_boerne"
                        : "boerne_showroom",
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84]"
                >
                  Request {service.shortTitle} Quote
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3.5 text-xs font-medium text-white transition hover:border-[#C9A46B]/60 hover:text-[#E7CCA0]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C9A46B]" />
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-white/12 bg-[#0D1119] shadow-2xl">
                <Image
                  src={service.heroImage}
                  alt={service.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070A]/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/12 bg-black/70 px-4 py-3 text-xs backdrop-blur-md">
                  <span className="flex items-center gap-2 text-[#E7CCA0]">
                    <ShieldCheck className="h-4 w-4" />
                    Performed in our climate-controlled Boerne studio
                  </span>
                  <Link
                    href="/#vehicle-studio"
                    className="hidden font-semibold text-white underline-offset-4 hover:text-[#E7CCA0] hover:underline sm:inline"
                  >
                    Open Vehicle Studio ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Highlights */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="text-[11px] font-semibold tracking-[0.26em] text-[#C9A46B] uppercase">
            Why It Matters
          </span>
          <h2 className="mt-3 font-serif text-3xl font-medium text-[#F5F2EB] sm:text-4xl">
            Engineered benefits for{" "}
            <span className="italic text-gold-gradient">Texas roads.</span>
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.highlights.map((h, i) => (
              <div
                key={h.title}
                className="glass-panel rounded-3xl p-6 transition hover:border-[#C9A46B]/40"
              >
                <span className="font-mono text-xs text-[#C9A46B]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-medium text-[#F5F2EB]">
                  {h.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-[#9AA2B2]">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages & Tiers */}
      <section className="border-y border-white/10 bg-[#080A10] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.26em] text-[#C9A46B] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Tailored Packages
            </span>
            <h2 className="mt-3 font-serif text-3xl font-medium text-[#F5F2EB] sm:text-4xl">
              Compare coverage &amp;{" "}
              <span className="italic text-gold-gradient">investment tiers.</span>
            </h2>
            <p className="mt-3 text-sm text-[#9AA2B2]">
              Illustrative ranges vary by vehicle size, panel complexity, and
              current paint condition. Select any tier to prefill your custom
              quote.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`flex flex-col justify-between rounded-3xl border p-6 sm:p-7 ${
                  pkg.badge
                    ? "glass-panel-gold shadow-[0_16px_50px_rgba(201,164,107,0.1)]"
                    : "glass-panel"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#8E95A2]">
                      {pkg.duration}
                    </span>
                    {pkg.badge && (
                      <span className="rounded-full bg-[#C9A46B] px-3 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-[#06070A] uppercase">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-medium text-[#F5F2EB]">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 font-mono text-lg font-semibold text-[#E7CCA0]">
                    {pkg.priceRange}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#9AA2B2]">
                    {pkg.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {pkg.includes.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-start gap-2.5 text-xs text-[#D6DAE2]"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A46B]" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      services: [service.name],
                      notes: `Interested in ${service.name} — ${pkg.name} (${pkg.priceRange}).`,
                    })
                  }
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold tracking-[0.16em] uppercase transition ${
                    pkg.badge
                      ? "bg-[#C9A46B] text-[#06070A] hover:bg-[#DFBD84]"
                      : "border border-white/15 bg-white/5 text-white hover:border-[#C9A46B]/60 hover:text-[#E7CCA0]"
                  }`}
                >
                  Select This Tier
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Studio Process */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="text-[11px] font-semibold tracking-[0.26em] text-[#C9A46B] uppercase">
            Our Disciplined Process
          </span>
          <h2 className="mt-3 font-serif text-3xl font-medium text-[#F5F2EB] sm:text-4xl">
            How we execute every{" "}
            <span className="italic text-gold-gradient">
              {service.shortTitle.toLowerCase()} build.
            </span>
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.processSteps.map((st) => (
              <div
                key={st.step}
                className="relative rounded-3xl border border-white/10 bg-[#0C1018] p-6"
              >
                <span className="font-serif text-4xl font-medium text-[#C9A46B]/45">
                  {st.step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {st.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9AA2B2]">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects (if available) */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-white/10 bg-[#080A10] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-serif text-3xl font-medium text-[#F5F2EB]">
              Recent studio finishes
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-panel grid overflow-hidden rounded-3xl sm:grid-cols-5"
                >
                  <div className="relative min-h-[190px] sm:col-span-2">
                    <Image
                      src={proj.imageUrl}
                      alt={proj.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:col-span-3">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-[#C9A46B] uppercase">
                      {proj.year} {proj.vehicle}
                    </p>
                    <h3 className="mt-1 font-serif text-xl text-white">
                      {proj.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#9AA2B2]">
                      {proj.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service FAQs */}
      <section className="border-t border-white/10 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="text-center font-serif text-3xl font-medium text-[#F5F2EB] sm:text-4xl">
            {service.shortTitle} Questions
          </h2>
          <div className="mt-8 space-y-3">
            {service.faqs.map((f, idx) => {
              const open = openFaq === idx;
              return (
                <div
                  key={f.question}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-white">
                      {f.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#C9A46B] transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-white/8 px-6 pb-5 pt-3.5 text-sm leading-relaxed text-[#9AA2B2]">
                      {f.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explore Other Disciplines */}
          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="text-center text-[11px] font-semibold tracking-[0.24em] text-[#C9A46B] uppercase">
              Pair With Other Studio Services
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs text-[#D6DAE2] transition hover:border-[#C9A46B]/60 hover:text-[#E7CCA0]"
                >
                  {other.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
