"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  ShieldCheck,
  MapPin,
  Sparkles,
  ChevronDown,
  Clock,
  CheckCircle2,
  Compass,
} from "lucide-react";
import type { ServiceRecord } from "@/db/schema";
import { BUSINESS_INFO } from "@/lib/studio-config";
import { useQuoteModal } from "./QuoteModalProvider";

export function HeroSection() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#06070A] pt-28 pb-20 sm:pt-32">
      {/* Cinematic Full-Bleed Studio Photograph */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-gt.jpg"
          alt="Obsidian grand tourer inside Elite Auto Spa Boerne showroom"
          fill
          priority
          className="object-cover object-center opacity-60 scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06070A] via-[#06070A]/80 to-[#06070A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070A] via-transparent to-[#06070A]/65" />
      </div>

      {/* Subtle vertical architectural hairline */}
      <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent xl:block" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-[#C9A46B]/35 bg-[#0D1016]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A46B]" />
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#E7CCA0] uppercase">
              Premium Automotive Restyling · Boerne &amp; San Antonio
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 className="mt-7 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-[#F5F2EB] sm:text-6xl lg:text-[78px]">
            Revitalize{" "}
            <span className="italic text-gold-gradient">Your Ride.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#C4C9D4] sm:text-lg">
            Self-healing paint protection film, liquid-depth ceramic coatings,
            nano-ceramic window tint, bespoke vinyl wraps, paint correction, and
            concours restoration—crafted under one roof in the Texas Hill Country.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#C9A46B] px-7 py-4 text-xs font-semibold tracking-[0.18em] text-[#06070A] uppercase shadow-[0_12px_40px_rgba(201,164,107,0.34)] transition hover:bg-[#DFBD84]"
            >
              Request Tailored Quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#vehicle-studio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-4 text-xs font-semibold tracking-[0.16em] text-[#F5F2EB] uppercase backdrop-blur-md transition hover:border-[#C9A46B]/60 hover:bg-[#C9A46B]/10"
            >
              <Sparkles className="h-4 w-4 text-[#C9A46B]" />
              Open Vehicle Studio
            </a>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs font-medium text-[#D5D9E2] transition hover:text-[#E7CCA0]"
            >
              <Phone className="h-4 w-4 text-[#C9A46B]" />
              <span className="tabular-nums">{BUSINESS_INFO.phone}</span>
            </a>
          </div>

          {/* Showroom Credentials Strip */}
          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-4 border-t border-white/12 pt-8 sm:grid-cols-4">
            <div>
              <p className="font-serif text-3xl font-medium tabular-nums text-[#E7CCA0]">
                {BUSINESS_INFO.vehiclesServiced}
              </p>
              <p className="mt-1 text-[11px] tracking-[0.14em] text-[#9AA2B2] uppercase">
                Vehicles Serviced
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-medium text-[#F5F2EB]">
                8
              </p>
              <p className="mt-1 text-[11px] tracking-[0.14em] text-[#9AA2B2] uppercase">
                Studio Disciplines
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-medium text-[#F5F2EB]">
                Boerne
              </p>
              <p className="mt-1 text-[11px] tracking-[0.14em] text-[#9AA2B2] uppercase">
                Clean-Room Bay
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-medium text-[#F5F2EB]">
                Mobile
              </p>
              <p className="mt-1 text-[11px] tracking-[0.14em] text-[#9AA2B2] uppercase">
                Detailing Options
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesGridSection({
  services,
}: {
  services: ServiceRecord[];
}) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section
      id="services"
      className="relative bg-[#06070A] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#C9A46B] uppercase">
              What We Do
            </span>
            <h2 className="mt-3 font-serif text-4xl font-medium text-[#F5F2EB] sm:text-5xl">
              A complete restyling studio{" "}
              <span className="italic text-gold-gradient">under one roof.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#9AA2B2] sm:text-base">
              From self-healing highway protection to total color
              transformations and concours revival, every vehicle receives
              disciplined preparation and showroom care.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-xs font-semibold tracking-[0.16em] text-[#F5F2EB] uppercase transition hover:border-[#C9A46B]/60 hover:text-[#E7CCA0] lg:self-auto"
          >
            Bundle Multiple Services
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <article
              key={service.slug}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0C1018] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A46B]/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
            >
              {/* Image Top */}
              <Link
                href={`/services/${service.slug}`}
                className="relative block aspect-[16/11] overflow-hidden"
              >
                <Image
                  src={service.heroImage}
                  alt={service.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1018] via-[#0C1018]/25 to-transparent" />
                <span className="absolute left-4 top-4 font-mono text-[11px] font-semibold text-[#E7CCA0]/90">
                  0{idx + 1}
                </span>
                {service.mobileEligible && (
                  <span className="absolute right-4 top-4 rounded-full border border-emerald-400/40 bg-black/70 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300 backdrop-blur-md">
                    Mobile Option
                  </span>
                )}
              </Link>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 text-[10px] font-semibold tracking-[0.2em] text-[#C9A46B] uppercase">
                    <span>{service.category}</span>
                    <span className="text-[#8E95A2]">
                      {service.turnaroundLabel}
                    </span>
                  </div>
                  <Link href={`/services/${service.slug}`}>
                    <h3 className="mt-2 font-serif text-2xl font-medium text-[#F5F2EB] transition group-hover:text-[#E7CCA0]">
                      {service.shortTitle}
                    </h3>
                  </Link>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#9AA2B2]">
                    {service.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="font-mono text-xs font-medium text-[#D6DAE2]">
                    {service.startingPriceLabel}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold tracking-[0.12em] text-[#E7CCA0] uppercase transition group-hover:gap-2"
                  >
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceAreaSection() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section
      id="service-area"
      className="relative overflow-hidden border-t border-white/10 bg-[#080A10] py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#C9A46B]/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.26em] text-[#C9A46B] uppercase">
              <Compass className="h-3.5 w-3.5" />
              Service Area &amp; Showroom
            </span>
            <h2 className="mt-4 font-serif text-4xl font-medium text-[#F5F2EB] sm:text-5xl">
              Boerne, San Antonio &amp; the{" "}
              <span className="italic text-gold-gradient">
                Texas Hill Country.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#9AA2B2] sm:text-base">
              Our dedicated clean-room restyling showroom sits right off I-10 in
              Boerne—welcoming enthusiasts from Fair Oaks Ranch, The Dominion,
              Alamo Heights, and Greater San Antonio. Qualifying detailing
              services are also available via mobile visit at your residence or
              office.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {BUSINESS_INFO.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-xs text-[#D6DAE2]"
                >
                  <MapPin className="h-3 w-3 text-[#C9A46B]" />
                  {area}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-[#0D1119] p-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C9A46B] uppercase">
                  Showroom Location
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {BUSINESS_INFO.address}
                </p>
                <p className="text-xs text-[#8E95A2]">
                  {BUSINESS_INFO.cityState}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C9A46B] uppercase">
                  Studio Hours
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-[#D6DAE2]">
                  <Clock className="h-3.5 w-3.5 text-[#C9A46B]" />
                  {BUSINESS_INFO.hoursWeekday}
                </p>
                <p className="mt-0.5 text-xs text-[#8E95A2]">
                  {BUSINESS_INFO.hoursSaturday}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: BUSINESS_INFO.vehiclesServiced,
                    label: "Vehicles Serviced",
                    sub: "Across Boerne & San Antonio",
                  },
                  {
                    value: "Climate",
                    label: "Controlled Clean Bay",
                    sub: "Dust-disciplined film & ceramic work",
                  },
                  {
                    value: "8+",
                    label: "Restyling Disciplines",
                    sub: "PPF, Ceramic, Tint, Wraps & More",
                  },
                  {
                    value: "Mobile",
                    label: "Qualifying Detailing",
                    sub: "Home or private office visits",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/8 bg-[#0A0D14]/90 p-5"
                  >
                    <p className="font-serif text-3xl font-medium text-[#E7CCA0] sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-white">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-[11px] text-[#8E95A2]">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A46B]" />
                  <div className="text-xs">
                    <p className="font-semibold text-white">
                      Schedule a Private Swatch &amp; Paint Walkaround
                    </p>
                    <p className="mt-0.5 text-[#9AA2B2]">
                      Inspect real PPF, tint, and vinyl film samples in person.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#C9A46B] px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#06070A] uppercase transition hover:bg-[#DFBD84]"
                >
                  Book Visit
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HOME_FAQS = [
  {
    q: "What is paint protection film (PPF) and is it worth it in Texas?",
    a: "Paint protection film is a clear, durable self-healing urethane film applied over painted surfaces to absorb impact from rock chips, highway gravel, and bug acids. On I-10, Highway 281, and Hill Country roads, many owners choose Full Front or Track Pack PPF to protect factory paint and resale value.",
  },
  {
    q: "What is the difference between ceramic coating and PPF?",
    a: "Ceramic coating is a liquid SiO2 polymer that cures into a slick, hydrophobic gloss layer making washing effortless and resisting UV/chemicals—but it does not stop rock chips. PPF is a physical impact-absorbing urethane barrier. Many owners combine both: PPF on high-strike panels and ceramic coating over the entire vehicle.",
  },
  {
    q: "How dark can window tint legally be in Texas?",
    a: "Texas regulates window tint by Visible Light Transmission (VLT) and window position (commonly 25% net VLT on front side windows and clear UV/IR heat film on windshields). Because state rules can be updated, always verify current Texas DPS tint regulations before installing—our team gladly walks you through compliant nano-ceramic options.",
  },
  {
    q: "How long do ceramic coatings last?",
    a: "Longevity depends on the selected multi-layer coating package, driving conditions, garage storage, and safe hand-washing habits. During consultation we confirm manufacturer expectations and provide straightforward care guidelines.",
  },
  {
    q: "Do you offer mobile detailing in Boerne and San Antonio?",
    a: "Yes—we offer mobile service for qualifying detailing packages across Boerne, Fair Oaks Ranch, and Greater San Antonio where on-site water, power, and shaded access conditions allow. Share your address in our quote drawer and we will confirm eligibility.",
  },
  {
    q: "How does saving a build in the Vehicle Studio work?",
    a: "When you customize tint VLT, wrap finish, color, and PPF zones in our Interactive Vehicle Studio and click Save Build, we store your build in our studio database with a unique EAS-XXXX code that you can attach directly to your quote request or track anytime in the Concierge portal.",
  },
  {
    q: "What is your appointment cancellation policy?",
    a: "Cancellations made within 24 hours of a scheduled bay appointment that are not rescheduled may be subject to a 25% cancellation fee. Please confirm final terms with our team when locking your booking.",
  },
];

export function FaqAndFinalCtaSection() {
  const { openQuoteModal } = useQuoteModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <section
        id="faq"
        className="border-t border-white/10 bg-[#06070A] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#C9A46B] uppercase">
              Straight Answers
            </span>
            <h2 className="mt-3 font-serif text-4xl font-medium text-[#F5F2EB] sm:text-5xl">
              Frequently asked{" "}
              <span className="italic text-gold-gradient">questions.</span>
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {HOME_FAQS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.q}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isOpen
                      ? "border-[#C9A46B]/45 bg-[#0E121B]"
                      : "border-white/8 bg-[#0A0D14] hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-medium text-[#F5F2EB] sm:text-base">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#C9A46B] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/8 px-6 pb-5 pt-4 text-sm leading-relaxed text-[#9AA2B2]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Architectural CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#080B11] py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,107,0.16)_0%,transparent_65%)]" />
        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A46B]/40 bg-[#C9A46B]/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.24em] text-[#E7CCA0] uppercase">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Ready When You Are
          </span>
          <h2 className="mt-5 font-serif text-4xl font-medium text-[#F5F2EB] sm:text-5xl lg:text-6xl">
            Ready to protect, restore, or{" "}
            <span className="italic text-gold-gradient">
              transform your vehicle?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#A3ABB9] sm:text-base">
            Share your vehicle details in under 60 seconds, attach your saved
            Vehicle Studio configuration, or speak directly with our Boerne
            showroom team.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-8 py-4 text-xs font-semibold tracking-[0.18em] text-[#06070A] uppercase shadow-[0_12px_40px_rgba(201,164,107,0.3)] transition hover:bg-[#DFBD84]"
            >
              Start Your Tailored Quote
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-xs font-semibold tracking-[0.16em] text-white uppercase transition hover:border-[#C9A46B]/60 hover:text-[#E7CCA0]"
            >
              <Phone className="h-4 w-4 text-[#C9A46B]" />
              Call {BUSINESS_INFO.phone}
            </a>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-medium tracking-[0.14em] text-[#C9A46B] uppercase transition hover:text-[#F5F2EB]"
            >
              Track an Existing Build
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
