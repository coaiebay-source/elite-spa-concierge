"use client";

import React, { useMemo, useState } from "react";
import {
  Sparkles,
  Shield,
  Sun,
  Palette,
  Layers,
  BookmarkCheck,
  ArrowUpRight,
  RotateCcw,
  Check,
  Loader2,
  Info,
  History,
} from "lucide-react";
import {
  VEHICLE_OPTIONS,
  PAINT_SWATCHES,
  FINISH_OPTIONS,
  TINT_OPTIONS,
  PPF_OPTIONS,
  calculateIllustrativeEstimate,
  type VehicleType,
  type FinishType,
  type PpfCoverageType,
} from "@/lib/studio-config";
import type { StudioBuildRecord } from "@/db/schema";
import { useQuoteModal } from "./QuoteModalProvider";

interface VehicleGeometry {
  bodyPath: string;
  bodyHighlightPath: string;
  sideCreasePath: string;
  glassPath: string;
  glassPillarPath: string;
  interiorSilhouettePath: string;
  frontWheelX: number;
  rearWheelX: number;
  wheelY: number;
  wheelR: number;
  headlightPath: string;
  taillightPath: string;
  partialFrontPpfPath: string;
  fullFrontPpfPath: string;
  trackPackExtraPath: string;
  grillePath: string;
}

const VEHICLE_GEOMETRIES: Record<VehicleType, VehicleGeometry> = {
  coupe: {
    bodyPath:
      "M148 395 Q162 365 215 352 L310 338 L422 266 Q465 244 548 242 L680 242 Q742 243 792 276 L878 334 L1035 352 Q1084 359 1106 385 L1116 420 L1106 458 Q1085 473 1022 474 L1018 448 A74 74 0 0 0 870 448 L866 474 L402 474 L398 448 A74 74 0 0 0 250 448 L246 474 L182 468 Q149 461 142 436 Z",
    bodyHighlightPath:
      "M218 356 L318 342 L432 270 Q474 250 550 248 L676 248 Q734 250 784 281 L874 340 L1032 358 Q1074 364 1094 384 L1076 392 L872 372 L308 378 L178 390 Z",
    sideCreasePath: "M248 394 Q560 374 878 386 Q980 390 1078 402",
    glassPath:
      "M338 335 L436 274 Q472 256 546 254 L676 254 Q728 256 774 286 L844 334 Q590 326 338 335 Z",
    glassPillarPath: "M588 255 L566 331",
    interiorSilhouettePath:
      "M468 330 L482 292 Q495 282 512 292 L522 330 Z M614 331 L626 286 Q642 274 662 288 L674 331 Z",
    rearWheelX: 324,
    frontWheelX: 944,
    wheelY: 452,
    wheelR: 62,
    headlightPath: "M1022 368 Q1068 370 1098 388 L1072 396 Q1040 388 1012 380 Z",
    taillightPath: "M154 388 L208 378 L216 393 L148 402 Z",
    partialFrontPpfPath:
      "M926 340 L1035 352 Q1084 359 1106 385 L1116 420 L1106 458 Q1085 473 1022 474 L1018 448 A74 74 0 0 0 924 382 Z",
    fullFrontPpfPath:
      "M792 334 L878 334 L1035 352 Q1084 359 1106 385 L1116 420 L1106 458 Q1085 473 1022 474 L1018 448 A74 74 0 0 0 870 448 L866 474 L796 474 Z",
    trackPackExtraPath:
      "M398 442 L868 442 L866 474 L402 474 Z M748 255 L862 336 L838 338 L732 262 Z M182 468 L246 474 L249 448 Q222 436 184 440 Z",
    grillePath: "M1066 416 L1113 418 L1108 448 L1054 446 Z",
  },
  sedan: {
    bodyPath:
      "M144 382 Q158 358 202 348 L286 336 L380 264 Q414 242 472 238 L690 238 Q744 239 788 272 L866 332 L1032 348 Q1080 354 1102 382 L1112 418 L1104 456 Q1082 473 1018 474 L1014 448 A74 74 0 0 0 866 448 L862 474 L400 474 L396 448 A74 74 0 0 0 248 448 L244 474 L178 468 Q146 462 140 436 Z",
    bodyHighlightPath:
      "M204 352 L292 340 L388 268 Q420 248 474 244 L686 244 Q736 246 780 278 L862 338 L1030 354 Q1072 360 1090 382 L1068 390 L862 368 L296 374 L170 386 Z",
    sideCreasePath: "M212 388 Q570 370 866 382 Q980 387 1080 398",
    glassPath:
      "M310 332 L396 270 Q424 252 474 250 L684 250 Q732 252 770 282 L836 332 Q575 322 310 332 Z",
    glassPillarPath: "M556 251 L544 328 M696 253 L716 329",
    interiorSilhouettePath:
      "M436 327 L448 288 Q462 278 478 288 L488 327 Z M598 327 L610 284 Q626 274 644 284 L656 327 Z",
    rearWheelX: 322,
    frontWheelX: 940,
    wheelY: 452,
    wheelR: 62,
    headlightPath: "M1020 364 Q1064 367 1094 385 L1068 394 Q1036 384 1010 377 Z",
    taillightPath: "M149 380 L206 372 L212 388 L144 395 Z",
    partialFrontPpfPath:
      "M922 338 L1032 348 Q1080 354 1102 382 L1112 418 L1104 456 Q1082 473 1018 474 L1014 448 A74 74 0 0 0 920 380 Z",
    fullFrontPpfPath:
      "M788 332 L866 332 L1032 348 Q1080 354 1102 382 L1112 418 L1104 456 Q1082 473 1018 474 L1014 448 A74 74 0 0 0 866 448 L862 474 L792 474 Z",
    trackPackExtraPath:
      "M396 442 L864 442 L862 474 L400 474 Z M744 248 L854 334 L830 336 L728 256 Z M178 468 L244 474 L247 446 Q216 436 180 440 Z",
    grillePath: "M1062 412 L1109 416 L1104 446 L1050 444 Z",
  },
  suv: {
    bodyPath:
      "M152 356 L186 322 L222 232 Q232 208 268 204 L710 204 Q754 205 782 234 L858 314 L1038 332 Q1084 338 1100 368 L1110 416 L1100 462 L1024 474 L1022 444 A79 79 0 0 0 864 444 L860 474 L394 474 L390 444 A79 79 0 0 0 232 444 L226 474 L166 464 L146 434 Z",
    bodyHighlightPath:
      "M228 234 Q238 216 270 212 L706 212 Q746 213 774 240 L854 322 L1036 338 Q1074 344 1090 368 L1068 378 L856 356 L220 358 L168 372 Z",
    sideCreasePath: "M186 376 Q560 362 862 370 Q986 374 1084 388",
    glassPath:
      "M226 320 L254 238 Q260 222 282 220 L702 220 Q736 222 760 246 L826 318 Z",
    glassPillarPath: "M424 221 L414 319 M604 221 L596 318",
    interiorSilhouettePath:
      "M462 316 L474 274 Q488 264 506 274 L516 316 Z M636 316 L648 272 Q664 262 682 274 L692 316 Z",
    rearWheelX: 311,
    frontWheelX: 943,
    wheelY: 448,
    wheelR: 67,
    headlightPath: "M1024 352 Q1070 354 1096 374 L1072 384 Q1040 374 1014 366 Z",
    taillightPath: "M154 348 L206 340 L212 362 L150 370 Z",
    partialFrontPpfPath:
      "M928 320 L1038 332 Q1084 338 1100 368 L1110 416 L1100 462 L1024 474 L1022 444 A79 79 0 0 0 924 366 Z",
    fullFrontPpfPath:
      "M790 314 L858 314 L1038 332 Q1084 338 1100 368 L1110 416 L1100 462 L1024 474 L1022 444 A79 79 0 0 0 864 444 L860 474 L792 474 Z",
    trackPackExtraPath:
      "M390 438 L862 438 L860 474 L394 474 Z M748 214 L846 316 L822 318 L732 222 Z M166 464 L226 474 L230 442 Q196 432 164 438 Z",
    grillePath: "M1066 398 L1108 402 L1104 444 L1056 442 Z",
  },
  pickup: {
    bodyPath:
      "M140 326 L444 322 L468 242 Q478 218 508 214 L718 214 Q756 216 782 246 L844 316 L1046 332 Q1090 338 1104 368 L1114 416 L1106 464 L1036 476 L1034 444 A80 80 0 0 0 874 444 L870 476 L390 476 L386 444 A80 80 0 0 0 226 444 L220 476 L152 464 L138 438 Z",
    bodyHighlightPath:
      "M148 334 L448 330 L474 246 Q484 224 510 222 L714 222 Q748 224 774 252 L840 322 L1044 338 Q1080 344 1094 368 L1072 380 L842 360 L152 362 Z",
    sideCreasePath: "M154 374 Q540 368 852 372 Q980 374 1088 386",
    glassPath:
      "M464 318 L488 250 Q494 232 516 230 L712 230 Q740 232 762 256 L814 316 Z",
    glassPillarPath: "M616 231 L612 317",
    interiorSilhouettePath:
      "M512 315 L524 274 Q538 264 556 274 L564 315 Z M654 315 L666 274 Q682 264 698 274 L708 315 Z",
    rearWheelX: 306,
    frontWheelX: 954,
    wheelY: 448,
    wheelR: 68,
    headlightPath: "M1032 350 Q1076 352 1100 374 L1078 388 Q1046 378 1022 368 Z",
    taillightPath: "M142 338 L174 338 L176 382 L140 384 Z",
    partialFrontPpfPath:
      "M938 322 L1046 332 Q1090 338 1104 368 L1114 416 L1106 464 L1036 476 L1034 444 A80 80 0 0 0 934 366 Z",
    fullFrontPpfPath:
      "M792 316 L844 316 L1046 332 Q1090 338 1104 368 L1114 416 L1106 464 L1036 476 L1034 444 A80 80 0 0 0 874 444 L870 476 L794 476 Z",
    trackPackExtraPath:
      "M386 438 L872 438 L870 476 L390 476 Z M750 224 L836 318 L814 320 L734 232 Z M152 464 L220 476 L224 442 Q190 432 152 438 Z",
    grillePath: "M1070 392 L1112 396 L1108 446 L1062 444 Z",
  },
};

function WheelArt({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const spokes = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
  return (
    <g>
      {/* Tire shadow & rubber */}
      <circle cx={cx} cy={cy} r={r} fill="url(#studio-tire-grad)" />
      <circle
        cx={cx}
        cy={cy}
        r={r - 3}
        fill="none"
        stroke="#2B323E"
        strokeWidth="2"
        strokeOpacity="0.6"
      />
      {/* Forged alloy outer barrel */}
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.72}
        fill="#0D1117"
        stroke="url(#studio-rim-grad)"
        strokeWidth="4.5"
      />
      {/* Brake rotor */}
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.56}
        fill="url(#studio-rotor-grad)"
        fillOpacity="0.45"
      />
      {/* Champagne anodized caliper */}
      <path
        d={`M ${cx - r * 0.44} ${cy - r * 0.16} A ${r * 0.46} ${r * 0.46} 0 0 0 ${cx - r * 0.36} ${cy + r * 0.28} L ${cx - r * 0.22} ${cy + r * 0.2} A ${r * 0.3} ${r * 0.3} 0 0 1 ${cx - r * 0.28} ${cy - r * 0.12} Z`}
        fill="#C9A46B"
        fillOpacity="0.92"
      />
      {/* Precision Y-spokes */}
      {spokes.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * (r * 0.19);
        const y1 = cy + Math.sin(rad) * (r * 0.19);
        const x2 = cx + Math.cos(rad) * (r * 0.68);
        const y2 = cy + Math.sin(rad) * (r * 0.68);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#studio-rim-grad)"
            strokeWidth={deg % 72 === 0 ? "3.2" : "2.1"}
            strokeLinecap="round"
          />
        );
      })}
      {/* Center lock cap */}
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.19}
        fill="#151922"
        stroke="#C9A46B"
        strokeWidth="2"
      />
      <circle cx={cx} cy={cy} r={r * 0.06} fill="#E7CCA0" />
    </g>
  );
}

interface VehicleStudioProps {
  initialBuilds: StudioBuildRecord[];
}

export function VehicleStudio({ initialBuilds }: VehicleStudioProps) {
  const { openQuoteModal } = useQuoteModal();

  const [vehicleType, setVehicleType] = useState<VehicleType>("coupe");
  const [paintId, setPaintId] = useState<string>("obsidian");
  const [finishType, setFinishType] = useState<FinishType>("gloss");
  const [tintVlt, setTintVlt] = useState<number>(25);
  const [ppfCoverage, setPpfCoverage] = useState<PpfCoverageType>("full_front");
  const [ceramicAddon, setCeramicAddon] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "tint" | "color" | "finish" | "protection"
  >("tint");

  // Persistence state
  const [saving, setSaving] = useState(false);
  const [savedBuilds, setSavedBuilds] =
    useState<StudioBuildRecord[]>(initialBuilds);
  const [lastSavedBuild, setLastSavedBuild] =
    useState<StudioBuildRecord | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);

  const selectedVehicle =
    VEHICLE_OPTIONS.find((v) => v.id === vehicleType) ?? VEHICLE_OPTIONS[0];
  const selectedPaint =
    PAINT_SWATCHES.find((p) => p.id === paintId) ?? PAINT_SWATCHES[0];
  const selectedFinish =
    FINISH_OPTIONS.find((f) => f.id === finishType) ?? FINISH_OPTIONS[0];
  const selectedTint =
    TINT_OPTIONS.find((t) => t.vlt === tintVlt) ?? TINT_OPTIONS[3];
  const selectedPpf =
    PPF_OPTIONS.find((p) => p.id === ppfCoverage) ?? PPF_OPTIONS[2];

  const geom = VEHICLE_GEOMETRIES[vehicleType];

  const estimate = useMemo(
    () =>
      calculateIllustrativeEstimate({
        vehicleType,
        finishType,
        ppfCoverage,
        tintVlt,
        ceramicAddon,
        includeWrap: selectedPaint.isWrapUpgrade,
      }),
    [
      vehicleType,
      finishType,
      ppfCoverage,
      tintVlt,
      ceramicAddon,
      selectedPaint.isWrapUpgrade,
    ]
  );

  const handleReset = () => {
    setVehicleType("coupe");
    setPaintId("obsidian");
    setFinishType("gloss");
    setTintVlt(25);
    setPpfCoverage("full_front");
    setCeramicAddon(true);
    setLastSavedBuild(null);
    setSaveError(null);
  };

  const buildSummaryText = `${selectedVehicle.label} · ${selectedPaint.name} (${selectedFinish.label}) · ${tintVlt}% VLT Tint · ${selectedPpf.label}${ceramicAddon ? " + Ceramic Coating" : ""}`;

  const handleSaveBuild = async (): Promise<StudioBuildRecord | null> => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/studio-builds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleType,
          paintName: selectedPaint.name,
          paintHex: selectedPaint.hex,
          finishType,
          tintVlt,
          ppfCoverage,
          ceramicAddon,
          notes: buildSummaryText,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error || "Unable to save studio build.");
        return null;
      }
      const created: StudioBuildRecord = data.build;
      setLastSavedBuild(created);
      setSavedBuilds((prev) => [
        created,
        ...prev.filter((b) => b.buildCode !== created.buildCode),
      ]);
      return created;
    } catch {
      setSaveError("Connection error while saving your configuration.");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleSendToQuote = async () => {
    let buildToAttach = lastSavedBuild;
    if (!buildToAttach) {
      buildToAttach = await handleSaveBuild();
    }

    const derivedServices: string[] = ["Nano-Ceramic Window Tint"];
    if (ppfCoverage !== "none") {
      derivedServices.unshift("Paint Protection Film (PPF)");
    }
    if (ceramicAddon) {
      derivedServices.push("Ceramic Coatings");
    }
    if (finishType !== "gloss" || selectedPaint.isWrapUpgrade) {
      derivedServices.push("Bespoke Vinyl Wraps");
    }

    openQuoteModal({
      services: derivedServices,
      vehicleBodyType: vehicleType,
      studioBuildCode: buildToAttach?.buildCode ?? null,
      studioSummary: buildSummaryText,
      notes: `Vehicle Studio configuration: ${buildSummaryText}`,
    });
  };

  const loadExistingBuild = (build: StudioBuildRecord) => {
    if (
      build.vehicleType === "sedan" ||
      build.vehicleType === "coupe" ||
      build.vehicleType === "suv" ||
      build.vehicleType === "pickup"
    ) {
      setVehicleType(build.vehicleType);
    }
    const matchingPaint = PAINT_SWATCHES.find(
      (p) => p.hex.toLowerCase() === build.paintHex.toLowerCase()
    );
    if (matchingPaint) setPaintId(matchingPaint.id);
    if (
      build.finishType === "gloss" ||
      build.finishType === "satin" ||
      build.finishType === "matte" ||
      build.finishType === "color-shift"
    ) {
      setFinishType(build.finishType);
    }
    setTintVlt(build.tintVlt);
    if (
      build.ppfCoverage === "none" ||
      build.ppfCoverage === "partial_front" ||
      build.ppfCoverage === "full_front" ||
      build.ppfCoverage === "track_pack" ||
      build.ppfCoverage === "full_vehicle"
    ) {
      setPpfCoverage(build.ppfCoverage);
    }
    setCeramicAddon(build.ceramicAddon);
    setLastSavedBuild(build);
    setShowSavedDrawer(false);
  };

  // Visual finish parameters
  const glossSpecOpacity =
    finishType === "gloss"
      ? ceramicAddon
        ? 0.62
        : 0.45
      : finishType === "satin"
      ? 0.24
      : finishType === "color-shift"
      ? 0.44
      : 0.08;

  const floorReflectOpacity =
    finishType === "gloss" ? (ceramicAddon ? 0.34 : 0.22) : 0.1;

  return (
    <section
      id="vehicle-studio"
      className="relative overflow-hidden border-y border-white/10 bg-[#080A0F] py-20 sm:py-28"
    >
      {/* Subtle architectural background glow */}
      <div className="pointer-events-none absolute inset-0 studio-grid-bg opacity-55" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[760px] -translate-x-1/2 rounded-full bg-[#C9A46B]/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading Row */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A46B]/30 bg-[#C9A46B]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.24em] text-[#E7CCA0] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive Vehicle Studio
            </span>
            <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-[#F5F2EB] sm:text-5xl lg:text-6xl">
              Your car.{" "}
              <span className="italic text-gold-gradient">Your signature look.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#9AA2B2] sm:text-base">
              Select your silhouette, dial in nano-ceramic tint VLT, preview
              bespoke satin or color-shift wrap tones, and map PPF armor zones.
              Save your build directly to our Boerne studio queue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowSavedDrawer((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-[#D6DAE2] transition hover:border-[#C9A46B]/50 hover:text-white"
            >
              <History className="h-3.5 w-3.5 text-[#C9A46B]" />
              Saved Studio Builds ({savedBuilds.length})
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-4 py-2.5 text-xs font-medium text-[#9AA2B2] transition hover:border-white/25 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Saved Builds Quick Tray */}
        {showSavedDrawer && (
          <div className="mt-6 rounded-2xl border border-[#C9A46B]/30 bg-[#0D1119]/95 p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#E7CCA0] uppercase">
                Recently Saved Studio Configurations
              </p>
              <button
                type="button"
                onClick={() => setShowSavedDrawer(false)}
                className="text-xs text-[#8E95A2] hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {savedBuilds.slice(0, 6).map((b) => (
                <button
                  key={b.buildCode}
                  type="button"
                  onClick={() => loadExistingBuild(b)}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#121723] p-3.5 text-left transition hover:border-[#C9A46B]/60 hover:bg-[#171D2B]"
                >
                  <span
                    className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-white/20 shadow-inner"
                    style={{ backgroundColor: b.paintHex }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#E7CCA0]">
                        {b.buildCode}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#8E95A2]">
                        {b.vehicleType}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs font-medium text-white">
                      {b.paintName} · {b.finishType}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#8E95A2]">
                      {b.tintVlt}% VLT · {b.ppfCoverage.replace("_", " ")}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 01: Vehicle Silhouette Selector */}
        <div className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {VEHICLE_OPTIONS.map((v) => {
            const active = vehicleType === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVehicleType(v.id)}
                className={`group relative flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all ${
                  active
                    ? "border-[#C9A46B]/70 bg-gradient-to-br from-[#1B1710] via-[#121620] to-[#0D1017] shadow-[0_8px_30px_rgba(201,164,107,0.14)]"
                    : "border-white/8 bg-[#0D1017]/80 hover:border-white/20 hover:bg-[#121620]"
                }`}
              >
                <div>
                  <span className="block text-xs font-semibold tracking-wide text-[#F5F2EB] sm:text-sm">
                    {v.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-[#8E95A2]">
                    {v.subtitle}
                  </span>
                </div>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs transition ${
                    active
                      ? "border-[#C9A46B] bg-[#C9A46B] text-[#06070A]"
                      : "border-white/10 text-[#6F7787] group-hover:border-white/25 group-hover:text-white"
                  }`}
                >
                  {active ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Studio Grid: Visual Stage + Customizer Deck */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: Architectural Preview Canvas */}
          <div className="glass-panel flex flex-col justify-between overflow-hidden rounded-3xl lg:col-span-7">
            {/* Top Telemetry Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#C9A46B] shadow-[0_0_12px_#C9A46B]" />
                <span className="text-xs font-semibold tracking-[0.16em] text-[#F5F2EB] uppercase">
                  {selectedVehicle.label}
                </span>
                <span className="text-xs text-[#6F7787]">|</span>
                <span className="text-xs text-[#C9A46B]">
                  {selectedPaint.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-[#D4D8E2]">
                  {tintVlt}% VLT
                </span>
                <span className="rounded-full border border-[#C9A46B]/30 bg-[#C9A46B]/10 px-2.5 py-1 text-[11px] font-medium capitalize text-[#E7CCA0]">
                  {selectedFinish.label}
                </span>
                {ceramicAddon && (
                  <span className="hidden rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-1 text-[11px] font-medium text-sky-200 sm:inline-flex">
                    Ceramic Seal
                  </span>
                )}
              </div>
            </div>

            {/* Interactive SVG Showroom Bay */}
            <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-[#0C1018] via-[#090C12] to-[#050608] px-3 py-6 sm:px-6 sm:py-8">
              <svg
                viewBox="0 0 1200 580"
                className="h-auto w-full max-w-[780px] select-none"
                role="img"
                aria-label={`Interactive ${selectedVehicle.label} visualization with ${selectedPaint.name} ${selectedFinish.label} finish, ${tintVlt}% VLT window tint, and ${selectedPpf.label} PPF`}
              >
                <defs>
                  {/* Overhead studio light glow */}
                  <radialGradient id="studio-ambient-halo" cx="50%" cy="32%" r="52%">
                    <stop offset="0%" stopColor="#C9A46B" stopOpacity="0.16" />
                    <stop offset="48%" stopColor="#6B829E" stopOpacity="0.09" />
                    <stop offset="100%" stopColor="#050608" stopOpacity="0" />
                  </radialGradient>

                  {/* Floor reflection */}
                  <radialGradient id="studio-floor-glow" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor={selectedPaint.highlightHex}
                      stopOpacity={floorReflectOpacity}
                    />
                    <stop offset="65%" stopColor="#1B2433" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#050608" stopOpacity="0" />
                  </radialGradient>

                  {/* Dynamic Paint Body Gradient */}
                  <linearGradient id="studio-body-paint" x1="0" y1="0" x2="0.15" y2="1">
                    <stop offset="0%" stopColor={selectedPaint.highlightHex} />
                    <stop offset="38%" stopColor={selectedPaint.hex} />
                    <stop offset="82%" stopColor={selectedPaint.shadowHex} />
                    <stop offset="100%" stopColor="#07090D" />
                  </linearGradient>

                  {/* Color-shift iridescent sheen */}
                  <linearGradient id="studio-colorshift" x1="0" y1="0" x2="1" y2="0.6">
                    <stop offset="0%" stopColor="#2CD5C4" stopOpacity="0.34" />
                    <stop offset="35%" stopColor="#C9A46B" stopOpacity="0.36" />
                    <stop offset="70%" stopColor="#845EF7" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#E6B87A" stopOpacity="0.28" />
                  </linearGradient>

                  {/* Specular studio light bar reflection */}
                  <linearGradient id="studio-specular-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="#FFFFFF"
                      stopOpacity={glossSpecOpacity}
                    />
                    <stop
                      offset="55%"
                      stopColor="#F5EAD6"
                      stopOpacity={glossSpecOpacity * 0.28}
                    />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Glass base sky/studio reflection */}
                  <linearGradient id="studio-glass-base" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0%" stopColor="#BFD6E6" stopOpacity="0.58" />
                    <stop offset="45%" stopColor="#6D8CA3" stopOpacity="0.44" />
                    <stop offset="100%" stopColor="#263B4D" stopOpacity="0.55" />
                  </linearGradient>

                  <linearGradient id="studio-glass-sheen" x1="0" y1="0" x2="1" y2="0.4">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.04" />
                    <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.35" />
                    <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#E7CCA0" stopOpacity="0.12" />
                  </linearGradient>

                  {/* Tire & Rim gradients */}
                  <radialGradient id="studio-tire-grad" cx="42%" cy="30%" r="72%">
                    <stop offset="0%" stopColor="#353D4B" />
                    <stop offset="68%" stopColor="#141922" />
                    <stop offset="100%" stopColor="#05070A" />
                  </radialGradient>
                  <linearGradient id="studio-rim-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F0F4F8" />
                    <stop offset="45%" stopColor="#94A1B2" />
                    <stop offset="72%" stopColor="#465366" />
                    <stop offset="100%" stopColor="#CFD7E2" />
                  </linearGradient>
                  <radialGradient id="studio-rotor-grad">
                    <stop offset="0%" stopColor="#8B95A5" />
                    <stop offset="100%" stopColor="#2B3340" />
                  </radialGradient>

                  {/* PPF diagonal micro-grid pattern */}
                  <pattern
                    id="studio-ppf-pattern"
                    width="14"
                    height="14"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(35)"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="14"
                      stroke="#E7CCA0"
                      strokeWidth="1.4"
                      strokeOpacity="0.34"
                    />
                  </pattern>

                  <clipPath id="studio-body-clip">
                    <path d={geom.bodyPath} />
                  </clipPath>
                  <clipPath id="studio-glass-clip">
                    <path d={geom.glassPath} />
                  </clipPath>
                </defs>

                {/* Architectural ceiling light bars */}
                <rect
                  x="190"
                  y="44"
                  width="820"
                  height="4"
                  rx="2"
                  fill="#F5EAD6"
                  fillOpacity="0.72"
                />
                <rect
                  x="270"
                  y="72"
                  width="660"
                  height="2"
                  rx="1"
                  fill="#C9A46B"
                  fillOpacity="0.38"
                />
                <ellipse
                  cx="600"
                  cy="280"
                  rx="520"
                  ry="220"
                  fill="url(#studio-ambient-halo)"
                />

                {/* Showroom horizon line */}
                <line
                  x1="60"
                  y1="472"
                  x2="1140"
                  y2="472"
                  stroke="#FFFFFF"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />

                {/* Floor ambient & contact shadows */}
                <ellipse
                  cx="625"
                  cy="505"
                  rx="485"
                  ry="36"
                  fill="url(#studio-floor-glow)"
                />
                <ellipse
                  cx="625"
                  cy="495"
                  rx="445"
                  ry="22"
                  fill="#000000"
                  fillOpacity="0.78"
                />

                {/* Vehicle Main Body */}
                <path
                  d={geom.bodyPath}
                  fill="url(#studio-body-paint)"
                  stroke="#FFFFFF"
                  strokeOpacity={finishType === "matte" ? "0.14" : "0.24"}
                  strokeWidth="1.5"
                />

                {/* Optional Color-Shift Overlay */}
                {finishType === "color-shift" && (
                  <path
                    d={geom.bodyPath}
                    fill="url(#studio-colorshift)"
                    style={{ mixBlendMode: "screen" }}
                  />
                )}

                {/* Satin diffused veil */}
                {finishType === "satin" && (
                  <path
                    d={geom.bodyPath}
                    fill="#E5E9F0"
                    fillOpacity="0.09"
                  />
                )}

                {/* Specular Light Bar Reflection across body */}
                <path
                  d={geom.bodyHighlightPath}
                  fill="url(#studio-specular-bar)"
                  clipPath="url(#studio-body-clip)"
                />

                {/* Sculpted side character crease */}
                <path
                  d={geom.sideCreasePath}
                  fill="none"
                  stroke={
                    finishType === "matte" ? "#FFFFFF" : "#F8EFE0"
                  }
                  strokeOpacity={
                    finishType === "gloss"
                      ? ceramicAddon
                        ? "0.52"
                        : "0.36"
                      : finishType === "satin"
                      ? "0.28"
                      : "0.18"
                  }
                  strokeWidth={finishType === "gloss" ? "2.4" : "1.8"}
                  strokeLinecap="round"
                />

                {/* Ceramic Hydrophobic Sparkle Accent */}
                {ceramicAddon && (
                  <g clipPath="url(#studio-body-clip)" opacity="0.72">
                    <line
                      x1="310"
                      y1="358"
                      x2="860"
                      y2="346"
                      stroke="#FFFFFF"
                      strokeWidth="1.4"
                      strokeDasharray="160 80 40 120"
                      strokeOpacity="0.6"
                    />
                    <circle cx="965" cy="364" r="3" fill="#FFF7E6" />
                    <circle cx="482" cy="252" r="2.2" fill="#FFF7E6" />
                  </g>
                )}

                {/* Front Grille, Headlight & Taillight */}
                <path
                  d={geom.grillePath}
                  fill="#07090D"
                  stroke="#394252"
                  strokeWidth="1.5"
                />
                <path
                  d={geom.headlightPath}
                  fill="#F8F3E6"
                  fillOpacity="0.92"
                />
                <path
                  d={geom.taillightPath}
                  fill="#D43A3A"
                  fillOpacity="0.9"
                />

                {/* Glass Base + Interior Seats + Dynamic VLT Tint Film */}
                <path d={geom.glassPath} fill="url(#studio-glass-base)" />
                <g clipPath="url(#studio-glass-clip)">
                  {/* Visible interior seats fade as VLT darkens */}
                  <path
                    d={geom.interiorSilhouettePath}
                    fill="#1C222D"
                    fillOpacity={Math.max(0.12, 1 - selectedTint.glassOpacity)}
                  />
                  {/* Dynamic VLT Tint Film Layer */}
                  <path
                    d={geom.glassPath}
                    fill="#040609"
                    fillOpacity={selectedTint.glassOpacity}
                  />
                  {/* Subtle glass specular reflection */}
                  <path
                    d={geom.glassPath}
                    fill="url(#studio-glass-sheen)"
                  />
                </g>

                {/* Window Pillars & Crisp Blackout Molding */}
                <path
                  d={geom.glassPillarPath}
                  stroke="#0A0D12"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d={geom.glassPath}
                  fill="none"
                  stroke="#1A202B"
                  strokeWidth="3.5"
                />

                {/* Interactive PPF Coverage Shield Overlay */}
                {ppfCoverage !== "none" && (
                  <g
                    clipPath="url(#studio-body-clip)"
                    className="animate-ppf-shield"
                  >
                    {ppfCoverage === "partial_front" && (
                      <>
                        <path
                          d={geom.partialFrontPpfPath}
                          fill="url(#studio-ppf-pattern)"
                        />
                        <path
                          d={geom.partialFrontPpfPath}
                          fill="#C9A46B"
                          fillOpacity="0.16"
                          stroke="#E7CCA0"
                          strokeWidth="2.5"
                          strokeDasharray="8 6"
                        />
                      </>
                    )}
                    {(ppfCoverage === "full_front" ||
                      ppfCoverage === "track_pack") && (
                      <>
                        <path
                          d={geom.fullFrontPpfPath}
                          fill="url(#studio-ppf-pattern)"
                        />
                        <path
                          d={geom.fullFrontPpfPath}
                          fill="#C9A46B"
                          fillOpacity="0.16"
                          stroke="#E7CCA0"
                          strokeWidth="2.5"
                          strokeDasharray="8 6"
                        />
                      </>
                    )}
                    {ppfCoverage === "track_pack" && (
                      <path
                        d={geom.trackPackExtraPath}
                        fill="#C9A46B"
                        fillOpacity="0.22"
                        stroke="#E7CCA0"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />
                    )}
                    {ppfCoverage === "full_vehicle" && (
                      <>
                        <path
                          d={geom.bodyPath}
                          fill="url(#studio-ppf-pattern)"
                        />
                        <path
                          d={geom.bodyPath}
                          fill="#C9A46B"
                          fillOpacity="0.14"
                          stroke="#E7CCA0"
                          strokeWidth="3"
                          strokeDasharray="10 6"
                        />
                      </>
                    )}
                  </g>
                )}

                {/* Forged Wheels */}
                <WheelArt
                  cx={geom.rearWheelX}
                  cy={geom.wheelY}
                  r={geom.wheelR}
                />
                <WheelArt
                  cx={geom.frontWheelX}
                  cy={geom.wheelY}
                  r={geom.wheelR}
                />
              </svg>

              {/* Corner Legend Pill */}
              {ppfCoverage !== "none" && (
                <div className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-2 rounded-full border border-[#C9A46B]/40 bg-black/75 px-3 py-1.5 text-[11px] text-[#E7CCA0] backdrop-blur-md">
                  <Shield className="h-3.5 w-3.5" />
                  <span>PPF Zone: {selectedPpf.label}</span>
                </div>
              )}
            </div>

            {/* Bottom Summary Strip */}
            <div className="flex flex-col justify-between gap-4 border-t border-white/8 bg-[#0A0D14] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#8E95A2] uppercase">
                  Illustrative Package Range
                </p>
                <p className="mt-0.5 font-mono text-lg font-semibold tabular-nums text-[#F5F2EB] sm:text-xl">
                  ${estimate.min.toLocaleString()} – $
                  {estimate.max.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveBuild}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-[#F5F2EB] transition hover:border-[#C9A46B]/60 hover:bg-[#C9A46B]/10 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#C9A46B]" />
                  ) : (
                    <BookmarkCheck className="h-3.5 w-3.5 text-[#C9A46B]" />
                  )}
                  {lastSavedBuild
                    ? `Saved · ${lastSavedBuild.buildCode}`
                    : "Save Build"}
                </button>
                <button
                  type="button"
                  onClick={handleSendToQuote}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#06070A] uppercase transition hover:bg-[#DFBD84] shadow-[0_6px_20px_rgba(201,164,107,0.28)]"
                >
                  Quote This Build
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Precision Controls Deck */}
          <div className="glass-panel flex flex-col rounded-3xl p-5 sm:p-6 lg:col-span-5">
            {/* Control Tabs */}
            <div className="grid grid-cols-4 gap-1.5 rounded-2xl border border-white/8 bg-[#090C12] p-1.5">
              {[
                { id: "tint" as const, label: "Tint", icon: Sun },
                { id: "color" as const, label: "Color", icon: Palette },
                { id: "finish" as const, label: "Finish", icon: Layers },
                { id: "protection" as const, label: "PPF", icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 text-[11px] font-medium transition ${
                      active
                        ? "bg-[#C9A46B] text-[#06070A] font-semibold shadow-sm"
                        : "text-[#9AA2B2] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Body */}
            <div className="mt-6 flex-1">
              {activeTab === "tint" && (
                <div className="space-y-5">
                  <div className="flex items-end justify-between rounded-2xl border border-white/8 bg-[#0B0F17] p-5">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.22em] text-[#C9A46B] uppercase">
                        Visible Light Transmission
                      </p>
                      <p className="mt-1 font-mono text-4xl font-semibold tabular-nums text-white">
                        {tintVlt}
                        <span className="text-xl text-[#C9A46B]">%</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full border border-[#C9A46B]/30 bg-[#C9A46B]/10 px-3 py-1 text-[11px] font-medium text-[#E7CCA0]">
                        {selectedTint.texasHint}
                      </span>
                      <p className="mt-1.5 text-xs font-medium text-[#D6DAE2]">
                        {selectedTint.label}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-[#9AA2B2]">
                    {selectedTint.note}
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {TINT_OPTIONS.map((t) => {
                      const active = tintVlt === t.vlt;
                      return (
                        <button
                          key={t.vlt}
                          type="button"
                          onClick={() => setTintVlt(t.vlt)}
                          className={`rounded-xl border px-3 py-3 text-center transition ${
                            active
                              ? "border-[#C9A46B] bg-[#C9A46B]/15 text-white"
                              : "border-white/10 bg-[#0D111A] text-[#9AA2B2] hover:border-white/25 hover:text-white"
                          }`}
                        >
                          <span className="block font-mono text-base font-semibold tabular-nums">
                            {t.vlt}%
                          </span>
                          <span className="mt-0.5 block text-[10px] text-[#8E95A2]">
                            {t.vlt >= 50
                              ? "Light"
                              : t.vlt >= 25
                              ? "Balanced"
                              : "Dark"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/[0.02] p-3.5 text-[11px] leading-relaxed text-[#8E95A2]">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A46B]" />
                    <span>
                      <strong className="text-[#D4D8E2]">
                        Visual guide only:
                      </strong>{" "}
                      Lower VLT admits less visible light. Confirm current Texas
                      DPS tint rules per window position—we review compliant
                      nano-ceramic shades with you in our Boerne showroom.
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "color" && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#C9A46B] uppercase">
                      Curated Paint &amp; Cast Vinyl Palette
                    </p>
                    <p className="mt-1 text-xs text-[#9AA2B2]">
                      Match your factory color or preview a full cast vinyl
                      transformation.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {PAINT_SWATCHES.map((swatch) => {
                      const active = paintId === swatch.id;
                      return (
                        <button
                          key={swatch.id}
                          type="button"
                          onClick={() => setPaintId(swatch.id)}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                            active
                              ? "border-[#C9A46B] bg-[#C9A46B]/12"
                              : "border-white/10 bg-[#0D111A] hover:border-white/25"
                          }`}
                        >
                          <span
                            className="h-9 w-9 shrink-0 rounded-lg border border-white/20 shadow-inner"
                            style={{
                              background: `linear-gradient(135deg, ${swatch.highlightHex}, ${swatch.hex}, ${swatch.shadowHex})`,
                            }}
                          />
                          <div className="min-w-0">
                            <span className="block truncate text-xs font-semibold text-white">
                              {swatch.name}
                            </span>
                            <span className="mt-0.5 block text-[10px] text-[#8E95A2]">
                              {swatch.isWrapUpgrade
                                ? "Bespoke Wrap Tone"
                                : "OEM / Classic Tone"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "finish" && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#C9A46B] uppercase">
                      Surface Sheen &amp; Texture
                    </p>
                    <p className="mt-1 text-xs text-[#9AA2B2]">
                      Compare optical gloss against stealth satin, frozen matte,
                      or color-shift films.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {FINISH_OPTIONS.map((f) => {
                      const active = finishType === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFinishType(f.id)}
                          className={`w-full rounded-2xl border p-4 text-left transition ${
                            active
                              ? "border-[#C9A46B] bg-[#C9A46B]/12"
                              : "border-white/10 bg-[#0D111A] hover:border-white/25"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">
                              {f.label}
                            </span>
                            <span className="text-[11px] font-medium text-[#E7CCA0]">
                              {f.tagline}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#9AA2B2]">
                            {f.sheenDescription}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "protection" && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#C9A46B] uppercase">
                      PPF Impact Zones &amp; Ceramic Topcoat
                    </p>
                    <p className="mt-1 text-xs text-[#9AA2B2]">
                      Visualize high-impact urethane coverage across Texas
                      highway strike zones.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {PPF_OPTIONS.map((opt) => {
                      const active = ppfCoverage === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPpfCoverage(opt.id)}
                          className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                            active
                              ? "border-[#C9A46B] bg-[#C9A46B]/14"
                              : "border-white/10 bg-[#0D111A] hover:border-white/25"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-white">
                              {opt.label}
                            </span>
                            {opt.baseRange[0] > 0 && (
                              <span className="font-mono text-[11px] text-[#E7CCA0]">
                                ${opt.baseRange[0].toLocaleString()}+
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[11px] text-[#8E95A2]">
                            {opt.zonesText}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Ceramic Toggle */}
                  <button
                    type="button"
                    onClick={() => setCeramicAddon((prev) => !prev)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                      ceramicAddon
                        ? "border-sky-400/50 bg-sky-500/10"
                        : "border-white/10 bg-[#0D111A] hover:border-white/25"
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-semibold text-white">
                        Add Hydrophobic Ceramic Coating
                      </span>
                      <span className="mt-0.5 block text-[11px] text-[#9AA2B2]">
                        Locks in liquid depth over paint or PPF for effortless
                        washing
                      </span>
                    </div>
                    <span
                      className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                        ceramicAddon ? "bg-[#C9A46B]" : "bg-white/15"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          ceramicAddon ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </button>
                </div>
              )}
            </div>

            {saveError && (
              <p className="mt-4 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-200">
                {saveError}
              </p>
            )}

            {lastSavedBuild && (
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200">
                Build{" "}
                <span className="font-mono font-semibold text-white">
                  {lastSavedBuild.buildCode}
                </span>{" "}
                saved to our Boerne studio database. Click{" "}
                <strong className="text-white">Quote This Build</strong> to send
                it directly to our estimators.
              </div>
            )}
          </div>
        </div>

        {/* Ethical Disclaimer (Honoring original site transparency) */}
        <p className="mt-6 text-center text-[11px] leading-relaxed text-[#6F7787]">
          <strong className="text-[#9AA2B2]">
            A visual starting point, not a physical product sample.
          </strong>{" "}
          Concept illustrations and estimate ranges help explore styling
          direction. Exact pricing, film availability, installed VLT, and Texas
          legal shade compliance are confirmed during your Boerne showroom
          consultation.
        </p>
      </div>
    </section>
  );
}
