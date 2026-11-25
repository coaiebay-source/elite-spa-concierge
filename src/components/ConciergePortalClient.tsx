"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Sparkles,
  Check,
  Clock,
  Wrench,
  Trash2,
  Save,
  ArrowUpRight,
  Loader2,
  LayoutDashboard,
  Compass,
  Car,
} from "lucide-react";
import type { QuoteRequestRecord, StudioBuildRecord } from "@/db/schema";
import { QUOTE_STATUS_META } from "@/lib/studio-config";
import { useQuoteModal } from "./QuoteModalProvider";

const STATUS_SEQUENCE = [
  "received",
  "reviewing",
  "estimate_sent",
  "scheduled",
  "in_bay",
  "completed",
] as const;

interface ConciergePortalClientProps {
  initialQuotes: QuoteRequestRecord[];
  initialBuilds: StudioBuildRecord[];
  initialLookupCode?: string;
}

export function ConciergePortalClient({
  initialQuotes,
  initialBuilds,
  initialLookupCode = "",
}: ConciergePortalClientProps) {
  const { openQuoteModal } = useQuoteModal();

  const [activeMode, setActiveMode] = useState<"tracker" | "studio">("tracker");
  const [quotes, setQuotes] = useState<QuoteRequestRecord[]>(initialQuotes);
  const [builds] = useState<StudioBuildRecord[]>(initialBuilds);

  // Client lookup state
  const [queryCode, setQueryCode] = useState(initialLookupCode);
  const [searching, setSearching] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [foundQuote, setFoundQuote] = useState<QuoteRequestRecord | null>(null);
  const [foundBuild, setFoundBuild] = useState<StudioBuildRecord | null>(null);

  // Studio row editor state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<string>("received");
  const [editEstimate, setEditEstimate] = useState<string>("");
  const [editNotes, setEditNotes] = useState<string>("");
  const [savingId, setSavingId] = useState<number | null>(null);

  const performLookup = async (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (!code) return;
    setSearching(true);
    setLookupError(null);
    setFoundQuote(null);
    setFoundBuild(null);

    try {
      if (code.startsWith("EAS-")) {
        const res = await fetch(
          `/api/studio-builds?code=${encodeURIComponent(code)}`
        );
        const data = await res.json();
        if (!res.ok) {
          setLookupError(data.error || `No saved build found for ${code}.`);
          return;
        }
        setFoundBuild(data.build);
      } else {
        const res = await fetch(
          `/api/quotes?code=${encodeURIComponent(code)}`
        );
        const data = await res.json();
        if (!res.ok) {
          setLookupError(data.error || `No quote inquiry found for ${code}.`);
          return;
        }
        setFoundQuote(data.quote);
        if (data.attachedBuild) {
          setFoundBuild(data.attachedBuild);
        }
      }
    } catch {
      setLookupError("Unable to reach studio database right now.");
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (initialLookupCode) {
      performLookup(initialLookupCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLookupCode]);

  const startEditing = (q: QuoteRequestRecord) => {
    setEditingId(q.id);
    setEditStatus(q.status);
    setEditEstimate(q.estimatedQuote || "");
    setEditNotes(q.shopNotes || "");
  };

  const handleSaveQuoteUpdate = async (id: number) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          estimatedQuote: editEstimate,
          shopNotes: editNotes,
        }),
      });
      const data = await res.json();
      if (res.ok && data.quote) {
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? data.quote : q))
        );
        if (foundQuote?.id === id) {
          setFoundQuote(data.quote);
        }
        setEditingId(null);
      }
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteQuote = async (id: number) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/quotes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
        if (foundQuote?.id === id) {
          setFoundQuote(null);
        }
      }
    } finally {
      setSavingId(null);
    }
  };

  const scheduledOrBayCount = quotes.filter(
    (q) => q.status === "scheduled" || q.status === "in_bay"
  ).length;

  return (
    <div className="min-h-screen bg-[#06070A] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A46B]/35 bg-[#C9A46B]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.24em] text-[#E7CCA0] uppercase">
              <ShieldCheck className="h-3.5 w-3.5" />
              Elite Auto Spa Concierge
            </span>
            <h1 className="mt-4 font-serif text-4xl font-medium text-[#F5F2EB] sm:text-5xl">
              Build Tracker &amp;{" "}
              <span className="italic text-gold-gradient">Studio Queue.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-[#9AA2B2]">
              Look up your live Boerne bay status using a Quote Reference
              (<span className="font-mono text-[#E7CCA0]">QTE-XXXX</span>) or
              Saved Vehicle Studio Build (
              <span className="font-mono text-[#E7CCA0]">EAS-XXXX</span>), or
              switch to the Studio Operations Desk to manage active bookings.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex self-start rounded-full border border-white/12 bg-[#0D1119] p-1 lg:self-auto">
            <button
              type="button"
              onClick={() => setActiveMode("tracker")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase transition ${
                activeMode === "tracker"
                  ? "bg-[#C9A46B] text-[#06070A]"
                  : "text-[#9AA2B2] hover:text-white"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              Client Tracker
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("studio")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase transition ${
                activeMode === "studio"
                  ? "bg-[#C9A46B] text-[#06070A]"
                  : "text-[#9AA2B2] hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Studio Desk ({quotes.length})
            </button>
          </div>
        </div>

        {/* MODE 1: CLIENT LOOKUP & TRACKER */}
        {activeMode === "tracker" && (
          <div className="mt-10 space-y-8">
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  performLookup(queryCode);
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A46B]" />
                  <input
                    type="text"
                    value={queryCode}
                    onChange={(e) => setQueryCode(e.target.value)}
                    placeholder="Enter Quote Code (e.g. QTE-8412) or Studio Build Code (e.g. EAS-9110)"
                    className="w-full rounded-full border border-white/15 bg-[#090C12] py-3.5 pl-11 pr-5 font-mono text-sm uppercase text-white placeholder:font-sans placeholder:normal-case placeholder:text-[#667082] outline-none transition focus:border-[#C9A46B]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={searching || !queryCode.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A46B] px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84] disabled:opacity-45"
                >
                  {searching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Locate Record"
                  )}
                </button>
              </form>

              {/* Quick Sample Codes for Immediate Exploration */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#8E95A2]">
                <span>Quick lookup:</span>
                {quotes.slice(0, 3).map((q) => (
                  <button
                    key={q.quoteCode}
                    type="button"
                    onClick={() => {
                      setQueryCode(q.quoteCode);
                      performLookup(q.quoteCode);
                    }}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-[#E7CCA0] transition hover:border-[#C9A46B] hover:bg-[#C9A46B]/15"
                  >
                    {q.quoteCode} ({q.vehicleMake})
                  </button>
                ))}
                {builds.slice(0, 2).map((b) => (
                  <button
                    key={b.buildCode}
                    type="button"
                    onClick={() => {
                      setQueryCode(b.buildCode);
                      performLookup(b.buildCode);
                    }}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-sky-300 transition hover:border-sky-400/60 hover:bg-sky-500/10"
                  >
                    {b.buildCode} (Studio)
                  </button>
                ))}
              </div>
            </div>

            {lookupError && (
              <div className="rounded-2xl border border-rose-500/35 bg-rose-500/10 px-6 py-4 text-sm text-rose-200">
                {lookupError}
              </div>
            )}

            {/* Found Quote Detail & Bay Timeline */}
            {foundQuote && (
              <div className="glass-panel rounded-3xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl font-semibold text-[#E7CCA0]">
                        {foundQuote.quoteCode}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                          QUOTE_STATUS_META[foundQuote.status]?.tone ??
                          "border-white/15 bg-white/10 text-white"
                        }`}
                      >
                        {QUOTE_STATUS_META[foundQuote.status]?.label ??
                          foundQuote.status}
                      </span>
                    </div>
                    <h2 className="mt-2 font-serif text-3xl font-medium text-white">
                      {foundQuote.vehicleYear} {foundQuote.vehicleMake}{" "}
                      {foundQuote.vehicleModel}
                    </h2>
                    <p className="mt-1 text-xs text-[#9AA2B2]">
                      Client: {foundQuote.clientName} ·{" "}
                      {foundQuote.serviceLocation.replace(/_/g, " ")}
                    </p>
                  </div>

                  {foundQuote.estimatedQuote && (
                    <div className="rounded-2xl border border-[#C9A46B]/35 bg-[#C9A46B]/10 px-5 py-3 text-right">
                      <span className="block text-[10px] tracking-[0.2em] text-[#E7CCA0] uppercase">
                        Estimator Quote
                      </span>
                      <span className="mt-0.5 block font-mono text-xl font-semibold text-white">
                        {foundQuote.estimatedQuote}
                      </span>
                    </div>
                  )}
                </div>

                {/* 6-Stage Bay Progress Bar */}
                <div className="mt-7">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-[#C9A46B] uppercase">
                    Live Showroom Progression
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {STATUS_SEQUENCE.map((st, idx) => {
                      const currentIdx = STATUS_SEQUENCE.indexOf(
                        foundQuote.status as (typeof STATUS_SEQUENCE)[number]
                      );
                      const completed = idx <= currentIdx;
                      const current = idx === currentIdx;
                      return (
                        <div
                          key={st}
                          className={`rounded-2xl border p-3.5 transition ${
                            current
                              ? "border-[#C9A46B] bg-[#C9A46B]/15"
                              : completed
                              ? "border-emerald-500/35 bg-emerald-500/10"
                              : "border-white/8 bg-[#0A0D14] opacity-55"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-[#9AA2B2]">
                              0{idx + 1}
                            </span>
                            {completed && (
                              <Check className="h-3.5 w-3.5 text-[#E7CCA0]" />
                            )}
                          </div>
                          <p className="mt-2 text-xs font-semibold text-white">
                            {QUOTE_STATUS_META[st]?.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-[#0A0D14] p-5">
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-[#C9A46B] uppercase">
                      Requested Services
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {foundQuote.servicesRequested.map((srv) => (
                        <span
                          key={srv}
                          className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-[#F5F2EB]"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                    {foundQuote.notes && (
                      <p className="mt-4 border-t border-white/8 pt-3 text-xs leading-relaxed text-[#9AA2B2]">
                        <strong className="text-[#D6DAE2]">Client Note:</strong>{" "}
                        {foundQuote.notes}
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-[#0A0D14] p-5">
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-[#C9A46B] uppercase">
                      Boerne Concierge Updates
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#E4E7EE]">
                      {foundQuote.shopNotes ||
                        QUOTE_STATUS_META[foundQuote.status]?.description}
                    </p>
                    {foundQuote.preferredDate && (
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-[#9AA2B2]">
                        <Clock className="h-3.5 w-3.5 text-[#C9A46B]" />
                        Target Window: {foundQuote.preferredDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Found or Attached Studio Build Card */}
            {foundBuild && (
              <div className="glass-panel-gold rounded-3xl p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="h-14 w-14 rounded-2xl border border-white/25 shadow-inner"
                      style={{ backgroundColor: foundBuild.paintHex }}
                    />
                    <div>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#E7CCA0]">
                        <Sparkles className="h-3.5 w-3.5" />
                        Studio Build · {foundBuild.buildCode}
                      </span>
                      <h3 className="mt-0.5 font-serif text-2xl font-medium text-white">
                        {foundBuild.paintName} ({foundBuild.finishType})
                      </h3>
                      <p className="text-xs capitalize text-[#9AA2B2]">
                        {foundBuild.vehicleType} · {foundBuild.tintVlt}% VLT Tint
                        · PPF: {foundBuild.ppfCoverage.replace(/_/g, " ")}
                        {foundBuild.ceramicAddon ? " · + Ceramic Coating" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="block text-[10px] tracking-[0.18em] text-[#8E95A2] uppercase">
                        Illustrative Range
                      </span>
                      <span className="font-mono text-base font-semibold text-white">
                        ${foundBuild.estimatedMin.toLocaleString()} – $
                        {foundBuild.estimatedMax.toLocaleString()}
                      </span>
                    </div>
                    {!foundQuote && (
                      <button
                        type="button"
                        onClick={() =>
                          openQuoteModal({
                            studioBuildCode: foundBuild.buildCode,
                            studioSummary: `${foundBuild.paintName} (${foundBuild.finishType}), ${foundBuild.tintVlt}% VLT, PPF: ${foundBuild.ppfCoverage.replace(/_/g, " ")}`,
                            vehicleBodyType:
                              foundBuild.vehicleType === "sedan" ||
                              foundBuild.vehicleType === "coupe" ||
                              foundBuild.vehicleType === "suv" ||
                              foundBuild.vehicleType === "pickup"
                                ? foundBuild.vehicleType
                                : "coupe",
                          })
                        }
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#C9A46B] px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#06070A] uppercase transition hover:bg-[#DFBD84]"
                      >
                        Request Quote
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Empty Helper Prompt */}
            {!foundQuote && !foundBuild && !lookupError && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="glass-panel rounded-3xl p-7">
                  <Car className="h-6 w-6 text-[#C9A46B]" />
                  <h3 className="mt-4 font-serif text-2xl text-white">
                    Haven&apos;t requested a quote yet?
                  </h3>
                  <p className="mt-2 text-sm text-[#9AA2B2]">
                    Configure your look in the Interactive Vehicle Studio or
                    submit a 60-second quote inquiry to receive your personal
                    tracking code.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openQuoteModal()}
                      className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#06070A] uppercase"
                    >
                      New Quote Request
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                    <Link
                      href="/#vehicle-studio"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium text-white hover:border-[#C9A46B]"
                    >
                      Open Vehicle Studio
                    </Link>
                  </div>
                </div>

                <div className="glass-panel rounded-3xl p-7">
                  <Wrench className="h-6 w-6 text-[#C9A46B]" />
                  <h3 className="mt-4 font-serif text-2xl text-white">
                    Testing the Studio Operations Desk?
                  </h3>
                  <p className="mt-2 text-sm text-[#9AA2B2]">
                    Switch to the Studio Desk tab above to view every live
                    PostgreSQL quote inquiry, update bay status in real time,
                    and attach estimator notes.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveMode("studio")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C9A46B]/50 bg-[#C9A46B]/10 px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#E7CCA0] uppercase hover:bg-[#C9A46B] hover:text-[#06070A]"
                  >
                    Open Studio Desk
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: STUDIO OPERATIONS DESK */}
        {activeMode === "studio" && (
          <div className="mt-10 space-y-8">
            {/* Live Metrics */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="glass-panel rounded-2xl p-5">
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[#9AA2B2] uppercase">
                  Active Quote Inquiries
                </span>
                <p className="mt-2 font-serif text-4xl text-[#F5F2EB]">
                  {quotes.length}
                </p>
              </div>
              <div className="glass-panel rounded-2xl p-5">
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[#9AA2B2] uppercase">
                  Scheduled / In Clean-Room Bay
                </span>
                <p className="mt-2 font-serif text-4xl text-[#E7CCA0]">
                  {scheduledOrBayCount}
                </p>
              </div>
              <div className="glass-panel rounded-2xl p-5">
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[#9AA2B2] uppercase">
                  Saved Vehicle Studio Builds
                </span>
                <p className="mt-2 font-serif text-4xl text-[#F5F2EB]">
                  {builds.length}
                </p>
              </div>
            </div>

            {/* Incoming Quotes Management List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-medium text-white">
                  Boerne Showroom Queue
                </h2>
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#C9A46B] px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#06070A] uppercase"
                >
                  + Log Quote
                </button>
              </div>

              {quotes.map((q) => {
                const isEditing = editingId === q.id;
                const statusInfo = QUOTE_STATUS_META[q.status];
                return (
                  <div
                    key={q.id}
                    className="glass-panel rounded-3xl p-5 sm:p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-sm font-semibold text-[#E7CCA0]">
                            {q.quoteCode}
                          </span>
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                              statusInfo?.tone ??
                              "border-white/15 bg-white/10 text-white"
                            }`}
                          >
                            {statusInfo?.label ?? q.status}
                          </span>
                          {q.studioBuildCode && (
                            <span className="rounded-full border border-sky-400/35 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[11px] text-sky-300">
                              Build {q.studioBuildCode}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-2xl text-white">
                          {q.vehicleYear} {q.vehicleMake} {q.vehicleModel}
                        </h3>
                        <p className="text-xs text-[#9AA2B2]">
                          <strong className="text-[#D6DAE2]">
                            {q.clientName}
                          </strong>{" "}
                          · {q.clientPhone} · {q.clientEmail} · Prefers{" "}
                          {q.preferredContact}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {q.servicesRequested.map((srv) => (
                            <span
                              key={srv}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-[#D6DAE2]"
                            >
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {!isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => startEditing(q)}
                              className="rounded-full border border-[#C9A46B]/50 bg-[#C9A46B]/10 px-4 py-2 text-xs font-semibold text-[#E7CCA0] transition hover:bg-[#C9A46B] hover:text-[#06070A]"
                            >
                              Update Bay Status
                            </button>
                            <button
                              type="button"
                              disabled={savingId === q.id}
                              onClick={() => handleDeleteQuote(q.id)}
                              aria-label={`Delete quote ${q.quoteCode}`}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#8E95A2] transition hover:border-rose-500/50 hover:text-rose-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#9AA2B2] hover:text-white"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {!isEditing && (q.estimatedQuote || q.shopNotes) && (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-[#090C12] px-4 py-3 text-xs">
                        <span className="text-[#C2C7D1]">
                          <strong className="text-[#C9A46B]">Shop Note:</strong>{" "}
                          {q.shopNotes || "—"}
                        </span>
                        {q.estimatedQuote && (
                          <span className="font-mono font-semibold text-[#E7CCA0]">
                            Estimate: {q.estimatedQuote}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Inline Editor */}
                    {isEditing && (
                      <div className="mt-5 grid gap-4 rounded-2xl border border-[#C9A46B]/35 bg-[#090C12] p-4 sm:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-[11px] text-[#9AA2B2]">
                            Workflow Status
                          </label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="w-full rounded-xl border border-white/15 bg-[#121723] px-3 py-2.5 text-xs text-white outline-none focus:border-[#C9A46B]"
                          >
                            {STATUS_SEQUENCE.map((st) => (
                              <option key={st} value={st}>
                                {QUOTE_STATUS_META[st].label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] text-[#9AA2B2]">
                            Estimated Quote
                          </label>
                          <input
                            type="text"
                            value={editEstimate}
                            onChange={(e) => setEditEstimate(e.target.value)}
                            placeholder="$3,850"
                            className="w-full rounded-xl border border-white/15 bg-[#121723] px-3 py-2.5 text-xs text-white outline-none focus:border-[#C9A46B]"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="mb-1 block text-[11px] text-[#9AA2B2]">
                            Shop Bay / Concierge Notes (Visible to Client)
                          </label>
                          <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                              type="text"
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Bay assignment, film brand, pickup timing..."
                              className="flex-1 rounded-xl border border-white/15 bg-[#121723] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#C9A46B]"
                            />
                            <button
                              type="button"
                              disabled={savingId === q.id}
                              onClick={() => handleSaveQuoteUpdate(q.id)}
                              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#C9A46B] px-5 py-2.5 text-xs font-semibold text-[#06070A] hover:bg-[#DFBD84] disabled:opacity-50"
                            >
                              {savingId === q.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Save className="h-3.5 w-3.5" />
                              )}
                              Save Update
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
