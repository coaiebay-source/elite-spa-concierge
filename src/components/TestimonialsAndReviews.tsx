"use client";

import React, { useState } from "react";
import { Star, Quote, Plus, X, Check, Loader2 } from "lucide-react";
import type { TestimonialRecord } from "@/db/schema";

interface TestimonialsAndReviewsProps {
  initialTestimonials: TestimonialRecord[];
}

export function TestimonialsAndReviews({
  initialTestimonials,
}: TestimonialsAndReviewsProps) {
  const [items, setItems] = useState<TestimonialRecord[]>(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [clientName, setClientName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [serviceName, setServiceName] = useState("Paint Protection Film (PPF)");
  const [location, setLocation] = useState("Boerne, TX");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          vehicle,
          serviceName,
          location,
          rating,
          quote,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to submit review.");
        return;
      }
      setItems((prev) => [data.testimonial, ...prev]);
      setSuccessMsg("Thank you! Your client story has been published.");
      setClientName("");
      setVehicle("");
      setQuote("");
      setShowForm(false);
    } catch {
      setError("Network error while submitting review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative border-t border-white/10 bg-[#06070A] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#C9A46B] uppercase">
              In Their Words
            </span>
            <h2 className="mt-3 font-serif text-4xl font-medium text-[#F5F2EB] sm:text-5xl">
              Trusted across Boerne &amp;{" "}
              <span className="italic text-gold-gradient">San Antonio.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm((prev) => !prev);
              setSuccessMsg(null);
            }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#C9A46B]/45 bg-[#C9A46B]/10 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-[#E7CCA0] uppercase transition hover:bg-[#C9A46B] hover:text-[#06070A] sm:self-auto"
          >
            {showForm ? (
              <>
                <X className="h-3.5 w-3.5" /> Close Form
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" /> Share Your Experience
              </>
            )}
          </button>
        </div>

        {successMsg && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-500/35 bg-emerald-500/10 px-5 py-3.5 text-xs text-emerald-200">
            <Check className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="glass-panel-gold mt-8 rounded-3xl p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-medium text-[#F5F2EB]">
                Leave a Client Impression
              </h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} stars`}
                    className="p-0.5"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        star <= rating
                          ? "fill-[#C9A46B] text-[#C9A46B]"
                          : "text-[#4D5566]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-200">
                {error}
              </p>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Your Name (e.g. Jordan M.)"
                className="rounded-xl border border-white/12 bg-[#0D1119] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none focus:border-[#C9A46B]"
              />
              <input
                type="text"
                required
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Vehicle (e.g. 2024 Porsche Macan)"
                className="rounded-xl border border-white/12 bg-[#0D1119] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none focus:border-[#C9A46B]"
              />
              <input
                type="text"
                required
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Service Performed"
                className="rounded-xl border border-white/12 bg-[#0D1119] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none focus:border-[#C9A46B]"
              />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City (e.g. Boerne, TX)"
                className="rounded-xl border border-white/12 bg-[#0D1119] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none focus:border-[#C9A46B]"
              />
            </div>

            <textarea
              rows={3}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="How did your finish turn out?"
              className="mt-4 w-full rounded-xl border border-white/12 bg-[#0D1119] px-4 py-3 text-sm text-white placeholder-[#5D6575] outline-none focus:border-[#C9A46B]"
            />

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84] disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Publish Impression
              </button>
            </div>
          </form>
        )}

        {/* Review Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.slice(0, 6).map((item) => (
            <blockquote
              key={item.id}
              className="glass-panel relative flex flex-col justify-between rounded-3xl p-7 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-[#C9A46B] text-[#C9A46B]"
                      />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-[#C9A46B]/30" />
                </div>

                <p className="mt-5 font-serif text-xl leading-relaxed text-[#F5F2EB] sm:text-2xl">
                  “{item.quote}”
                </p>
              </div>

              <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-5 text-xs">
                <div>
                  <cite className="not-italic font-semibold text-white">
                    {item.clientName}
                  </cite>
                  <span className="mt-0.5 block text-[#9AA2B2]">
                    {item.vehicle} · {item.location}
                  </span>
                </div>
                <span className="rounded-full border border-[#C9A46B]/30 bg-[#C9A46B]/10 px-3 py-1 text-[11px] font-medium text-[#E7CCA0]">
                  {item.serviceName}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
