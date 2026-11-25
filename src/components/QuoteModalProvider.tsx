"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MapPin,
  Phone,
  Calendar,
  Car,
  ShieldCheck,
  Copy,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { BUSINESS_INFO } from "@/lib/studio-config";

export interface QuotePrefill {
  services?: string[];
  vehicleBodyType?: "sedan" | "coupe" | "suv" | "pickup" | "other";
  studioBuildCode?: string | null;
  studioSummary?: string | null;
  notes?: string;
  serviceLocation?: "boerne_showroom" | "mobile_boerne" | "mobile_san_antonio";
}

interface QuoteModalContextValue {
  openQuoteModal: (prefill?: QuotePrefill) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used inside QuoteModalProvider");
  }
  return ctx;
}

const SERVICE_CHOICES = [
  "Paint Protection Film (PPF)",
  "Ceramic Coatings",
  "Nano-Ceramic Window Tint",
  "Bespoke Vinyl Wraps",
  "Mobile & In-Shop Detailing",
  "Multi-Stage Paint Correction",
  "Vehicle Restoration & Revival",
  "Overspray & Undercarriage",
];

const BUDGET_CHOICES = [
  "Under $750",
  "$750 – $2,000",
  "$2,000 – $4,500",
  "$4,500 – $7,500",
  "$7,500+ Full Build",
  "Advise Me",
];

interface SubmittedQuote {
  quoteCode: string;
  clientName: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  servicesRequested: string[];
  serviceLocation: string;
  studioBuildCode?: string | null;
}

export function QuoteModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedQuote, setSubmittedQuote] = useState<SubmittedQuote | null>(
    null
  );
  const [copiedCode, setCopiedCode] = useState(false);

  // Form fields
  const [studioBuildCode, setStudioBuildCode] = useState<string | null>(null);
  const [studioSummary, setStudioSummary] = useState<string | null>(null);
  const [vehicleYear, setVehicleYear] = useState("2025");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleBodyType, setVehicleBodyType] = useState<
    "sedan" | "coupe" | "suv" | "pickup" | "other"
  >("coupe");

  const [servicesRequested, setServicesRequested] = useState<string[]>([
    "Paint Protection Film (PPF)",
  ]);
  const [serviceLocation, setServiceLocation] = useState<
    "boerne_showroom" | "mobile_boerne" | "mobile_san_antonio"
  >("boerne_showroom");
  const [preferredDate, setPreferredDate] = useState("");
  const [budgetRange, setBudgetRange] = useState("Advise Me");
  const [notes, setNotes] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState<
    "call" | "text" | "email"
  >("text");

  const openQuoteModal = useCallback((prefill?: QuotePrefill) => {
    setSubmittedQuote(null);
    setErrorMessage(null);
    setStep(1);
    setStudioBuildCode(prefill?.studioBuildCode ?? null);
    setStudioSummary(prefill?.studioSummary ?? null);
    if (prefill?.vehicleBodyType) {
      setVehicleBodyType(prefill.vehicleBodyType);
    }
    if (prefill?.services && prefill.services.length > 0) {
      setServicesRequested(prefill.services);
    }
    if (prefill?.serviceLocation) {
      setServiceLocation(prefill.serviceLocation);
    }
    if (prefill?.notes) {
      setNotes(prefill.notes);
    }
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuoteModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeQuoteModal]);

  const toggleService = (name: string) => {
    setServicesRequested((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const canAdvanceStep1 =
    vehicleYear.trim().length >= 4 &&
    vehicleMake.trim().length >= 2 &&
    vehicleModel.trim().length >= 1;

  const canAdvanceStep2 = servicesRequested.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setErrorMessage("Please complete your name, email, and phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioBuildCode,
          clientName,
          clientEmail,
          clientPhone,
          preferredContact,
          vehicleYear,
          vehicleMake,
          vehicleModel,
          vehicleBodyType,
          servicesRequested,
          serviceLocation,
          preferredDate,
          budgetRange,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(
          data.error || "Unable to submit your request. Please check your entries."
        );
        return;
      }
      setSubmittedQuote(data.quote);
    } catch {
      setErrorMessage("Network issue submitting your quote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Clipboard blocked in restricted iframe
    }
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-drawer-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeQuoteModal();
          }}
        >
          <div className="relative flex h-full w-full max-w-2xl flex-col border-l border-white/10 bg-[#0A0D13] text-[#F5F2EB] shadow-2xl">
            {/* Top Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <p className="text-[11px] font-medium tracking-[0.26em] text-[#C9A46B] uppercase">
                  Boerne &amp; San Antonio Concierge
                </p>
                <h2
                  id="quote-drawer-title"
                  className="mt-1 font-serif text-2xl font-medium tracking-wide text-[#F5F2EB] sm:text-3xl"
                >
                  {submittedQuote
                    ? "Showroom Inquiry Confirmed"
                    : "Request a Tailored Quote"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeQuoteModal}
                aria-label="Close quote modal"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9AA2B2] transition hover:border-[#C9A46B]/50 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step Indicator */}
            {!submittedQuote && (
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 bg-[#0D1119] px-6 py-3.5 sm:px-8">
                {[
                  { num: 1 as const, label: "01 Vehicle" },
                  { num: 2 as const, label: "02 Restyling" },
                  { num: 3 as const, label: "03 Contact" },
                ].map((item) => {
                  const active = step === item.num;
                  const done = step > item.num;
                  return (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => {
                        if (item.num < step) setStep(item.num);
                      }}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                        active
                          ? "border-[#C9A46B]/60 bg-[#C9A46B]/12 text-[#F5F2EB]"
                          : done
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border-white/5 bg-white/[0.02] text-[#7D8596]"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                          active
                            ? "bg-[#C9A46B] text-[#06070A] font-semibold"
                            : done
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-white/10 text-[#9AA2B2]"
                        }`}
                      >
                        {done ? <Check className="h-3 w-3" /> : item.num}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Body Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {submittedQuote ? (
                <div className="space-y-6 py-4">
                  <div className="rounded-2xl border border-[#C9A46B]/35 bg-gradient-to-br from-[#191611] via-[#10141D] to-[#0A0D13] p-6 sm:p-8">
                    <div className="flex items-center gap-3 text-[#C9A46B]">
                      <ShieldCheck className="h-6 w-6" />
                      <span className="text-xs font-semibold tracking-[0.22em] uppercase">
                        Saved in Studio Queue
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#C2C7D1]">
                      Thank you,{" "}
                      <span className="font-semibold text-white">
                        {submittedQuote.clientName}
                      </span>
                      . Our Boerne restyling specialists have logged your build
                      inquiry for your{" "}
                      <span className="font-semibold text-white">
                        {submittedQuote.vehicleYear}{" "}
                        {submittedQuote.vehicleMake}{" "}
                        {submittedQuote.vehicleModel}
                      </span>{" "}
                      and will follow up during showroom hours.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 px-5 py-4">
                      <div>
                        <p className="text-[11px] tracking-[0.2em] text-[#8E95A2] uppercase">
                          Confirmation Reference
                        </p>
                        <p className="mt-1 font-mono text-2xl font-semibold tracking-wider text-[#E7CCA0]">
                          {submittedQuote.quoteCode}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(submittedQuote.quoteCode)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-[#C9A46B]/60 hover:bg-[#C9A46B]/15"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-xs text-[#9AA2B2] sm:grid-cols-2">
                      <div>
                        <span className="block text-[10px] tracking-[0.18em] text-[#7D8596] uppercase">
                          Requested Services
                        </span>
                        <span className="mt-1 block text-[#F5F2EB]">
                          {submittedQuote.servicesRequested.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] tracking-[0.18em] text-[#7D8596] uppercase">
                          Attached Studio Build
                        </span>
                        <span className="mt-1 block font-mono text-[#E7CCA0]">
                          {submittedQuote.studioBuildCode || "Custom Consultation"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/concierge?code=${encodeURIComponent(
                        submittedQuote.quoteCode
                      )}`}
                      onClick={closeQuoteModal}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C9A46B] px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-[#06070A] uppercase transition hover:bg-[#DFBD84]"
                    >
                      Track Live Build Status
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={closeQuoteModal}
                      className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#F5F2EB] uppercase transition hover:border-white/30 hover:bg-white/5"
                    >
                      Return to Studio
                    </button>
                  </div>

                  <p className="text-center text-xs text-[#8E95A2]">
                    Need immediate assistance? Call our Boerne showroom at{" "}
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="text-[#E7CCA0] underline-offset-4 hover:underline"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form
                  id="elite-quote-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {studioBuildCode && (
                    <div className="flex items-start justify-between gap-3 rounded-xl border border-[#C9A46B]/40 bg-[#C9A46B]/10 p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#E7CCA0]" />
                        <div>
                          <p className="text-xs font-semibold tracking-[0.14em] text-[#E7CCA0] uppercase">
                            Vehicle Studio Build Attached ·{" "}
                            <span className="font-mono">{studioBuildCode}</span>
                          </p>
                          {studioSummary && (
                            <p className="mt-1 text-xs text-[#D4D7DF]">
                              {studioSummary}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setStudioBuildCode(null);
                          setStudioSummary(null);
                        }}
                        className="text-xs text-[#9AA2B2] hover:text-white"
                      >
                        Detach
                      </button>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* STEP 1: VEHICLE */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div>
                        <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#C9A46B] uppercase">
                          <Car className="h-4 w-4" /> Step 1 — Tell us about your
                          vehicle
                        </p>
                        <p className="mt-1.5 text-sm text-[#9AA2B2]">
                          Exact make and model allow our team to scope panel
                          curves, film coverage, and cure timing accurately.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-[#C2C7D1]">
                            Model Year *
                          </label>
                          <input
                            type="text"
                            value={vehicleYear}
                            onChange={(e) => setVehicleYear(e.target.value)}
                            placeholder="2025"
                            required
                            className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none transition focus:border-[#C9A46B]"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-[#C2C7D1]">
                            Make *
                          </label>
                          <input
                            type="text"
                            value={vehicleMake}
                            onChange={(e) => setVehicleMake(e.target.value)}
                            placeholder="Porsche, BMW, Ford..."
                            required
                            className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none transition focus:border-[#C9A46B]"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-[#C2C7D1]">
                            Model / Trim *
                          </label>
                          <input
                            type="text"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            placeholder="911 GTS, X5, F-250..."
                            required
                            className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none transition focus:border-[#C9A46B]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#C2C7D1]">
                          Body Profile
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                          {(
                            [
                              { id: "coupe", label: "Coupe" },
                              { id: "sedan", label: "Sedan" },
                              { id: "suv", label: "SUV" },
                              { id: "pickup", label: "Pickup" },
                              { id: "other", label: "Classic / Exotic" },
                            ] as const
                          ).map((body) => (
                            <button
                              key={body.id}
                              type="button"
                              onClick={() => setVehicleBodyType(body.id)}
                              className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                                vehicleBodyType === body.id
                                  ? "border-[#C9A46B] bg-[#C9A46B]/15 text-[#F5F2EB]"
                                  : "border-white/10 bg-[#111622] text-[#9AA2B2] hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {body.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-xs leading-relaxed text-[#8E95A2]">
                        <span className="font-semibold text-[#D6DAE2]">
                          Showroom Note:
                        </span>{" "}
                        Taking delivery soon? Mention your expected delivery
                        date in Step 2 so we can reserve a clean-room bay right
                        away before highway rock chips happen.
                      </div>
                    </div>
                  )}

                  {/* STEP 2: SERVICES & LOCATION */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-medium tracking-[0.2em] text-[#C9A46B] uppercase">
                          Step 2 — Select Restyling Disciplines *
                        </p>
                        <p className="mt-1 text-sm text-[#9AA2B2]">
                          Combine multiple treatments under one roof for cohesive
                          prep and streamlined bay scheduling.
                        </p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {SERVICE_CHOICES.map((service) => {
                            const selected = servicesRequested.includes(service);
                            return (
                              <button
                                key={service}
                                type="button"
                                onClick={() => toggleService(service)}
                                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-xs font-medium transition ${
                                  selected
                                    ? "border-[#C9A46B] bg-[#C9A46B]/15 text-white"
                                    : "border-white/10 bg-[#111622] text-[#9AA2B2] hover:border-white/25 hover:text-white"
                                }`}
                              >
                                <span>{service}</span>
                                <span
                                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                    selected
                                      ? "border-[#C9A46B] bg-[#C9A46B] text-[#06070A]"
                                      : "border-white/20"
                                  }`}
                                >
                                  {selected && <Check className="h-3 w-3" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center gap-2 text-xs font-medium text-[#C2C7D1]">
                          <MapPin className="h-3.5 w-3.5 text-[#C9A46B]" />
                          Preferred Service Location
                        </label>
                        <div className="grid gap-2.5 sm:grid-cols-3">
                          {(
                            [
                              {
                                id: "boerne_showroom",
                                title: "Boerne Showroom",
                                sub: "108 Scheele Rd, Unit 3",
                              },
                              {
                                id: "mobile_boerne",
                                title: "Mobile — Boerne",
                                sub: "Qualifying detailing",
                              },
                              {
                                id: "mobile_san_antonio",
                                title: "Mobile — San Antonio",
                                sub: "Qualifying detailing",
                              },
                            ] as const
                          ).map((loc) => (
                            <button
                              key={loc.id}
                              type="button"
                              onClick={() => setServiceLocation(loc.id)}
                              className={`rounded-xl border p-3.5 text-left transition ${
                                serviceLocation === loc.id
                                  ? "border-[#C9A46B] bg-[#C9A46B]/15"
                                  : "border-white/10 bg-[#111622] hover:border-white/25"
                              }`}
                            >
                              <div className="text-xs font-semibold text-white">
                                {loc.title}
                              </div>
                              <div className="mt-0.5 text-[11px] text-[#8E95A2]">
                                {loc.sub}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#C2C7D1]">
                            <Calendar className="h-3.5 w-3.5 text-[#C9A46B]" />
                            Target Timing (Optional)
                          </label>
                          <input
                            type="text"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            placeholder="e.g. Next week, After delivery..."
                            className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none transition focus:border-[#C9A46B]"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-[#C2C7D1]">
                            Estimated Budget Comfort
                          </label>
                          <select
                            value={budgetRange}
                            onChange={(e) => setBudgetRange(e.target.value)}
                            className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white outline-none transition focus:border-[#C9A46B]"
                          >
                            {BUDGET_CHOICES.map((b) => (
                              <option key={b} value={b} className="bg-[#0D1119]">
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#C2C7D1]">
                          Paint Color, Goals, or Special Notes
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Share paint color, condition, desired wrap shade, or Texas tint questions..."
                          className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none transition focus:border-[#C9A46B]"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONTACT DETAILS */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#C9A46B] uppercase">
                          <Phone className="h-4 w-4" /> Step 3 — Where should we
                          send your quote?
                        </p>
                        <p className="mt-1.5 text-sm text-[#9AA2B2]">
                          We respond promptly during showroom hours (Mon–Fri 9am–5pm,
                          Sat by appointment).
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-[#C2C7D1]">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="Your full name"
                            required
                            className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none transition focus:border-[#C9A46B]"
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-medium text-[#C2C7D1]">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={clientEmail}
                              onChange={(e) => setClientEmail(e.target.value)}
                              placeholder="you@domain.com"
                              required
                              className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none transition focus:border-[#C9A46B]"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-medium text-[#C2C7D1]">
                              Mobile Phone *
                            </label>
                            <input
                              type="tel"
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              placeholder="(210) 555-0199"
                              required
                              className="w-full rounded-xl border border-white/12 bg-[#111622] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none transition focus:border-[#C9A46B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-medium text-[#C2C7D1]">
                            Preferred Reply Method
                          </label>
                          <div className="grid grid-cols-3 gap-2.5">
                            {(
                              [
                                { id: "text", label: "SMS Text" },
                                { id: "call", label: "Phone Call" },
                                { id: "email", label: "Email" },
                              ] as const
                            ).map((method) => (
                              <button
                                key={method.id}
                                type="button"
                                onClick={() => setPreferredContact(method.id)}
                                className={`rounded-xl border py-2.5 text-xs font-medium transition ${
                                  preferredContact === method.id
                                    ? "border-[#C9A46B] bg-[#C9A46B]/15 text-white"
                                    : "border-white/10 bg-[#111622] text-[#9AA2B2] hover:border-white/25"
                                }`}
                              >
                                {method.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Review summary card */}
                      <div className="rounded-xl border border-white/10 bg-[#0F141F] p-4 text-xs">
                        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C9A46B] uppercase">
                          Summary Preview
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[#F5F2EB]">
                          <span className="font-semibold">
                            {vehicleYear} {vehicleMake} {vehicleModel}
                          </span>
                          <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[11px] capitalize text-[#C2C7D1]">
                            {vehicleBodyType}
                          </span>
                        </div>
                        <p className="mt-2 text-[#9AA2B2]">
                          {servicesRequested.join(" · ")}
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Footer Controls */}
            {!submittedQuote && (
              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#0D1119] px-6 py-4 sm:px-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium text-[#D0D5DF] transition hover:border-white/30 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : (
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="text-xs text-[#9AA2B2] transition hover:text-[#E7CCA0]"
                  >
                    Prefer to call?{" "}
                    <span className="font-medium text-white">
                      {BUSINESS_INFO.phone}
                    </span>
                  </a>
                )}

                {step === 1 && (
                  <button
                    type="button"
                    disabled={!canAdvanceStep1}
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="button"
                    disabled={!canAdvanceStep2}
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                {step === 3 && (
                  <button
                    type="submit"
                    form="elite-quote-form"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-7 py-3 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Quote Request
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
}
