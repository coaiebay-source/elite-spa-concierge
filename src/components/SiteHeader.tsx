"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ArrowUpRight, Shield } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/studio-config";
import { useQuoteModal } from "./QuoteModalProvider";

const NAV_LINKS = [
  { label: "Vehicle Studio", href: "/#vehicle-studio" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Craft", href: "/#craft-reveal" },
  { label: "FAQ", href: "/#faq" },
  { label: "Concierge & Tracker", href: "/concierge" },
];

export function SiteHeader() {
  const { openQuoteModal } = useQuoteModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#06070A]/85 py-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          : "bg-gradient-to-b from-[#06070A]/90 via-[#06070A]/45 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand Monogram */}
        <Link href="/" className="group flex items-center gap-3.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9A46B]/45 bg-gradient-to-br from-[#1C1812] via-[#10131B] to-[#080A0F] shadow-inner transition group-hover:border-[#E7CCA0]">
            <Shield className="h-4 w-4 text-[#C9A46B] transition group-hover:scale-105" />
            <span className="absolute -bottom-0.5 h-0.5 w-4 rounded-full bg-[#C9A46B]/70" />
          </div>
          <div className="leading-none">
            <span className="block font-serif text-xl font-semibold tracking-[0.14em] text-[#F5F2EB] uppercase">
              Elite Auto Spa
            </span>
            <span className="mt-1 block text-[10px] font-medium tracking-[0.26em] text-[#9AA2B2] uppercase">
              Boerne · San Antonio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium tracking-[0.14em] text-[#B9C0CE] uppercase transition hover:text-[#E7CCA0]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-[#E3E6EE] transition hover:border-[#C9A46B]/50 hover:text-[#E7CCA0]"
          >
            <Phone className="h-3.5 w-3.5 text-[#C9A46B]" />
            <span className="tabular-nums">{BUSINESS_INFO.phone}</span>
          </a>
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84] shadow-[0_6px_24px_rgba(201,164,107,0.28)]"
          >
            Get a Quote
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="rounded-full bg-[#C9A46B] px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-[#06070A] uppercase"
          >
            Quote
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#080B10]/98 px-6 pb-7 pt-5 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/5 pb-3 text-sm font-medium tracking-[0.16em] text-[#E2E6EE] uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-xs font-medium text-white"
            >
              <Phone className="h-4 w-4 text-[#C9A46B]" />
              Call {BUSINESS_INFO.phone}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openQuoteModal();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A46B] py-3 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase"
            >
              Request Tailored Quote
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
