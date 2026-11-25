"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Shield,
} from "lucide-react";
import { BUSINESS_INFO } from "@/lib/studio-config";
import { useQuoteModal } from "./QuoteModalProvider";

const SERVICE_LINKS = [
  { label: "Paint Protection Film (PPF)", href: "/services/paint-protection-film" },
  { label: "Ceramic Coatings", href: "/services/ceramic-coatings" },
  { label: "Nano-Ceramic Window Tint", href: "/services/window-tint" },
  { label: "Bespoke Vinyl Wraps", href: "/services/vinyl-wraps" },
  { label: "Mobile & In-Shop Detailing", href: "/services/mobile-detailing" },
  { label: "Multi-Stage Paint Correction", href: "/services/paint-correction" },
  { label: "Vehicle Restoration", href: "/services/vehicle-restoration" },
  { label: "Overspray & Undercarriage", href: "/services/overspray-undercarriage" },
];

export function SiteFooter() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <footer className="relative border-t border-white/10 bg-[#050608] text-[#B8BFCC]">
      {/* Top Ambient Gold Hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A46B]/45 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9A46B]/45 bg-[#12151E]">
                <Shield className="h-4 w-4 text-[#C9A46B]" />
              </div>
              <div>
                <span className="block font-serif text-xl font-semibold tracking-[0.14em] text-[#F5F2EB] uppercase">
                  Elite Auto Spa
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#8E95A2] uppercase">
                  Boerne · Greater San Antonio
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#929AA9]">
              Showroom-level automotive protection, paint correction, nano-ceramic
              tinting, bespoke wraps, and concours revival—crafted under one roof
              in the Texas Hill Country.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Elite Auto Spa Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-[#C2C7D1] transition hover:border-[#C9A46B]/60 hover:text-[#E7CCA0]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={BUSINESS_INFO.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Elite Auto Spa Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-[#C2C7D1] transition hover:border-[#C9A46B]/60 hover:text-[#E7CCA0]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A46B]/50 bg-[#C9A46B]/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#E7CCA0] uppercase transition hover:bg-[#C9A46B] hover:text-[#06070A]"
              >
                Book Consult
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Services Directory */}
          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold tracking-[0.24em] text-[#C9A46B] uppercase">
              Restyling Disciplines
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {SERVICE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-[#9AA2B2] transition hover:text-[#F5F2EB]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom Details */}
          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold tracking-[0.24em] text-[#C9A46B] uppercase">
              Boerne Showroom &amp; Hours
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A46B]" />
                <span>
                  <strong className="font-medium text-[#F5F2EB]">
                    {BUSINESS_INFO.address}
                  </strong>
                  <span className="block text-xs text-[#8E95A2]">
                    {BUSINESS_INFO.cityState} · Serving Greater San Antonio
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#C9A46B]" />
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="tabular-nums text-[#F5F2EB] transition hover:text-[#E7CCA0]"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#C9A46B]" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-[#C2C7D1] transition hover:text-[#E7CCA0]"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A46B]" />
                <span className="text-xs leading-relaxed text-[#9AA2B2]">
                  {BUSINESS_INFO.hoursWeekday}
                  <br />
                  {BUSINESS_INFO.hoursSaturday}
                  <br />
                  {BUSINESS_INFO.hoursSunday}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Policies Bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-7 text-xs text-[#707887] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights
            reserved. Cancellations within 24 hours without rescheduling may be
            subject to a 25% cancellation fee.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/concierge"
              className="text-[#9AA2B2] transition hover:text-[#E7CCA0]"
            >
              Client Build Tracker
            </Link>
            <Link
              href="/#vehicle-studio"
              className="text-[#9AA2B2] transition hover:text-[#E7CCA0]"
            >
              Vehicle Studio
            </Link>
            <Link
              href="/#faq"
              className="text-[#9AA2B2] transition hover:text-[#E7CCA0]"
            >
              Texas Tint &amp; FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
