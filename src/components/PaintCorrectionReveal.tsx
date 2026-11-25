"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useQuoteModal } from "./QuoteModalProvider";

export function PaintCorrectionReveal() {
  const { openQuoteModal } = useQuoteModal();
  const [position, setPosition] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(94, Math.max(6, pct)));
  };

  return (
    <section
      id="craft-reveal"
      className="relative overflow-hidden bg-[#06070A] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Editorial Copy Left */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A46B]/30 bg-[#C9A46B]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.24em] text-[#E7CCA0] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              The Finishing Touch
            </span>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.08] text-[#F5F2EB] sm:text-5xl">
              Clarity measured in{" "}
              <span className="italic text-gold-gradient">microns.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#9AA2B2] sm:text-base">
              Even brand-new vehicles frequently leave the lot with wash swirls,
              transport haze, and dull clear coat. Drag the calibration light
              across the panel to experience the optical difference of our
              multi-stage paint correction &amp; ceramic jeweling.
            </p>

            <ul className="mt-7 space-y-3.5 text-sm text-[#D6DAE2]">
              {[
                "Ultrasonic clear-coat thickness mapping before any pad touches paint",
                "Zero glaze fillers — stripped with IPA to verify true defect removal",
                "Ideal optical foundation before PPF or 5-Year Ceramic Coating",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A46B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  openQuoteModal({
                    services: [
                      "Multi-Stage Paint Correction",
                      "Ceramic Coatings",
                    ],
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84]"
              >
                Book Paint Evaluation
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <span className="text-xs text-[#7D8596]">
                Drag slider or tap image to inspect
              </span>
            </div>
          </div>

          {/* Interactive Comparison Viewport Right */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onPointerDown={(e) => {
                draggingRef.current = true;
                (e.currentTarget as HTMLDivElement).setPointerCapture(
                  e.pointerId
                );
                updateFromClientX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (!draggingRef.current) return;
                updateFromClientX(e.clientX);
              }}
              onPointerUp={() => {
                draggingRef.current = false;
              }}
              onPointerCancel={() => {
                draggingRef.current = false;
              }}
              className="group relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-white/12 bg-[#0C0F16] shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            >
              {/* AFTER Layer (Full Crisp Mirror Corrected Finish) */}
              <Image
                src="/images/service-correction.jpg"
                alt="Multi-stage corrected and ceramic-coated mirror paint surface"
                fill
                className="object-cover object-center contrast-[1.08] saturate-[1.08]"
                priority={false}
              />

              {/* BEFORE Layer (Clipped Left Side — Simulated Swirl Haze & Oxidation) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <Image
                  src="/images/service-correction.jpg"
                  alt="Untreated paint with light swirl haze and micro-marring"
                  fill
                  className="object-cover object-center brightness-[0.86] contrast-[0.74] saturate-[0.65] blur-[0.8px]"
                />
                {/* Fine simulated swirl/spiderweb haze overlay */}
                <div
                  className="absolute inset-0 opacity-65"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 32% 45%, rgba(255,255,255,0.22) 0%, transparent 45%), repeating-radial-gradient(circle at 38% 52%, transparent 0px, transparent 5px, rgba(220,230,245,0.12) 6px, transparent 7px), repeating-radial-gradient(circle at 68% 36%, transparent 0px, transparent 7px, rgba(210,220,235,0.1) 8px, transparent 9px)",
                  }}
                />
                <div className="absolute inset-0 bg-[#1B2230]/28" />
              </div>

              {/* Corner Inspection Badges */}
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/70 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-[#C2C7D1] uppercase backdrop-blur-md">
                Before · Swirl Haze
              </div>
              <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-[#C9A46B]/50 bg-black/75 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#E7CCA0] uppercase backdrop-blur-md">
                After · Stage 2 + Ceramic
              </div>

              {/* Vertical Calibration Divider */}
              <div
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-gradient-to-b from-[#E7CCA0]/60 via-[#C9A46B] to-[#E7CCA0]/60 shadow-[0_0_24px_rgba(201,164,107,0.9)]"
                style={{ left: `${position}%` }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E7CCA0] bg-[#0B0E14]/90 text-[#E7CCA0] shadow-[0_0_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition group-hover:scale-105">
                  <MoveHorizontal className="h-5 w-5" />
                </div>
              </div>

              {/* Accessible Range Input Overlay for Keyboard Support */}
              <input
                type="range"
                min={6}
                max={94}
                value={Math.round(position)}
                onChange={(e) => setPosition(Number(e.target.value))}
                aria-label="Compare paint before and after correction"
                className="sr-only"
              />

              {/* Bottom Telemetry Caption */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-4 py-2.5 text-[11px] text-[#C2C7D1] backdrop-blur-md">
                <span>Inspection Beam: 5000K CRI-96 LED</span>
                <span className="font-mono text-[#E7CCA0] tabular-nums">
                  {Math.round(position)}% / {Math.round(100 - position)}% Split
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
