export const BUSINESS_INFO = {
  name: "Elite Auto Spa",
  tagline: "Premium Automotive Restyling Studio",
  address: "108 Scheele Rd, Unit 3",
  cityState: "Boerne, TX",
  fullAddress: "108 Scheele Rd, Unit 3, Boerne, TX",
  phone: "(830) 431-2088",
  phoneHref: "tel:+18304312088",
  email: "contact@eliteautospasa.com",
  hoursWeekday: "Mon – Fri: 9:00 AM – 5:00 PM",
  hoursSaturday: "Saturday: By Appointment Only",
  hoursSunday: "Sunday: Closed",
  instagram: "https://www.instagram.com/eliteautospasa/",
  facebook: "https://www.facebook.com/eliteautospasa/",
  vehiclesServiced: "6,421+",
  serviceAreas: [
    "Boerne, TX",
    "San Antonio, TX",
    "Fair Oaks Ranch",
    "The Dominion",
    "Texas Hill Country",
    "Mobile: Home or Office",
  ],
} as const;

export type VehicleType = "sedan" | "coupe" | "suv" | "pickup";
export type FinishType = "gloss" | "satin" | "matte" | "color-shift";
export type PpfCoverageType =
  | "none"
  | "partial_front"
  | "full_front"
  | "track_pack"
  | "full_vehicle";

export interface VehicleOption {
  id: VehicleType;
  label: string;
  subtitle: string;
  multiplier: number;
}

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "coupe",
    label: "Sports Coupe",
    subtitle: "Low sculpted profile",
    multiplier: 1.0,
  },
  {
    id: "sedan",
    label: "Luxury Sedan",
    subtitle: "Four-door executive",
    multiplier: 1.05,
  },
  {
    id: "suv",
    label: "Performance SUV",
    subtitle: "Tall utility silhouette",
    multiplier: 1.2,
  },
  {
    id: "pickup",
    label: "Crew-Cab Pickup",
    subtitle: "Full-size Texas truck",
    multiplier: 1.25,
  },
];

export interface PaintSwatch {
  id: string;
  name: string;
  hex: string;
  highlightHex: string;
  shadowHex: string;
  isWrapUpgrade: boolean;
}

export const PAINT_SWATCHES: PaintSwatch[] = [
  {
    id: "obsidian",
    name: "Obsidian Metallic",
    hex: "#151922",
    highlightHex: "#394458",
    shadowHex: "#06080C",
    isWrapUpgrade: false,
  },
  {
    id: "graphite",
    name: "Nardo Graphite",
    hex: "#525B66",
    highlightHex: "#8793A2",
    shadowHex: "#1D2228",
    isWrapUpgrade: false,
  },
  {
    id: "chalk",
    name: "Alabaster Chalk",
    hex: "#D9D6CE",
    highlightHex: "#F5F3EE",
    shadowHex: "#6D6A64",
    isWrapUpgrade: false,
  },
  {
    id: "emerald",
    name: "Hill Country Emerald",
    hex: "#1B3A31",
    highlightHex: "#3D7362",
    shadowHex: "#071410",
    isWrapUpgrade: true,
  },
  {
    id: "champagne",
    name: "Champagne Bronze",
    hex: "#8A7152",
    highlightHex: "#D1B58C",
    shadowHex: "#2F2417",
    isWrapUpgrade: true,
  },
  {
    id: "sapphire",
    name: "Midnight Sapphire",
    hex: "#162A4C",
    highlightHex: "#3E6299",
    shadowHex: "#071021",
    isWrapUpgrade: true,
  },
  {
    id: "crimson",
    name: "Carmine Velvet",
    hex: "#6B1A23",
    highlightHex: "#B53846",
    shadowHex: "#26070B",
    isWrapUpgrade: true,
  },
  {
    id: "amethyst",
    name: "Iridescent Slate",
    hex: "#3A3152",
    highlightHex: "#7A69A6",
    shadowHex: "#141021",
    isWrapUpgrade: true,
  },
];

export interface FinishOption {
  id: FinishType;
  label: string;
  tagline: string;
  sheenDescription: string;
  costRange: [number, number];
}

export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: "gloss",
    label: "Liquid Gloss",
    tagline: "Mirror OEM depth",
    sheenDescription: "Crisp high-reflection clarity with razor-sharp specular highlights.",
    costRange: [0, 0],
  },
  {
    id: "satin",
    label: "Stealth Satin",
    tagline: "Velvet architectural sheen",
    sheenDescription: "Diffused soft-glow finish that accentuates every sculpted body crease.",
    costRange: [3400, 4800],
  },
  {
    id: "matte",
    label: "Frozen Matte",
    tagline: "Zero-glare stealth",
    sheenDescription: "Ultra-low luster motorsport silhouette with unmistakable road presence.",
    costRange: [3600, 5100],
  },
  {
    id: "color-shift",
    label: "Color-Shift",
    tagline: "Multi-tone iridescent",
    sheenDescription: "Dynamic chromatic transition shifting under Texas sun and studio light.",
    costRange: [4400, 6200],
  },
];

export interface TintOption {
  vlt: number;
  label: string;
  note: string;
  glassOpacity: number;
  texasHint: string;
}

export const TINT_OPTIONS: TintOption[] = [
  {
    vlt: 70,
    label: "70% Air Ceramic",
    note: "Virtually clear solar heat shield — popular for windshields & factory look.",
    glassOpacity: 0.24,
    texasHint: "Optical clarity focus",
  },
  {
    vlt: 50,
    label: "50% Refined Light",
    note: "Subtle architectural smoke with effortless nighttime visibility.",
    glassOpacity: 0.42,
    texasHint: "Light smoke shade",
  },
  {
    vlt: 35,
    label: "35% Balanced Shade",
    note: "A clean mid-dark balance offering refined glare control and visibility.",
    glassOpacity: 0.58,
    texasHint: "Balanced luxury look",
  },
  {
    vlt: 25,
    label: "25% Texas Classic",
    note: "Common reference point for Texas front-side compliance (verify with glass).",
    glassOpacity: 0.72,
    texasHint: "Popular Texas reference",
  },
  {
    vlt: 15,
    label: "15% Executive Dark",
    note: "Deep privacy look commonly chosen for rear cabin glass and SUVs.",
    glassOpacity: 0.84,
    texasHint: "Rear-glass privacy focus",
  },
  {
    vlt: 5,
    label: "5% Limousine",
    note: "Maximum blackout privacy styling for rear passenger and cargo glass.",
    glassOpacity: 0.94,
    texasHint: "Maximum privacy shade",
  },
];

export interface PpfOption {
  id: PpfCoverageType;
  label: string;
  zonesText: string;
  baseRange: [number, number];
}

export const PPF_OPTIONS: PpfOption[] = [
  {
    id: "none",
    label: "No PPF Selected",
    zonesText: "Previewing bare paint or vinyl finish only",
    baseRange: [0, 0],
  },
  {
    id: "partial_front",
    label: "Partial Front",
    zonesText: "Bumper, leading 24\" hood & fenders, mirrors",
    baseRange: [1250, 1650],
  },
  {
    id: "full_front",
    label: "Full Front",
    zonesText: "Full hood, full fenders, bumper, headlights & mirrors",
    baseRange: [2100, 2850],
  },
  {
    id: "track_pack",
    label: "Track & Hill Country",
    zonesText: "Full front + rockers, A-pillars, roofline & rear splash",
    baseRange: [3100, 3950],
  },
  {
    id: "full_vehicle",
    label: "Full Body Armor",
    zonesText: "100% bumper-to-bumper self-healing urethane protection",
    baseRange: [5800, 7900],
  },
];

export function calculateIllustrativeEstimate(params: {
  vehicleType: VehicleType;
  finishType: FinishType;
  ppfCoverage: PpfCoverageType;
  tintVlt: number;
  ceramicAddon: boolean;
  includeWrap: boolean;
}): { min: number; max: number } {
  const vehicle =
    VEHICLE_OPTIONS.find((v) => v.id === params.vehicleType) ??
    VEHICLE_OPTIONS[0];
  const ppf =
    PPF_OPTIONS.find((p) => p.id === params.ppfCoverage) ?? PPF_OPTIONS[0];
  const finish =
    FINISH_OPTIONS.find((f) => f.id === params.finishType) ?? FINISH_OPTIONS[0];

  let min = 0;
  let max = 0;

  // Window tint (nano-ceramic baseline)
  min += 495;
  max += 720;

  // PPF zone
  min += ppf.baseRange[0];
  max += ppf.baseRange[1];

  // Wrap / specialty finish (avoid double-counting full body PPF + full satin wrap if both full)
  if (params.finishType !== "gloss" || params.includeWrap) {
    if (params.ppfCoverage === "full_vehicle" && params.finishType === "satin") {
      // Stealth satin PPF replaces needing separate vinyl wrap
      min += 450;
      max += 750;
    } else if (finish.costRange[0] > 0) {
      min += finish.costRange[0];
      max += finish.costRange[1];
    } else if (params.includeWrap) {
      min += 3400;
      max += 4900;
    }
  }

  // Ceramic coating add-on
  if (params.ceramicAddon) {
    min += 995;
    max += 1650;
  }

  return {
    min: Math.round((min * vehicle.multiplier) / 50) * 50,
    max: Math.round((max * vehicle.multiplier) / 50) * 50,
  };
}

export const QUOTE_STATUS_META: Record<
  string,
  { label: string; tone: string; description: string }
> = {
  received: {
    label: "Received",
    tone: "bg-amber-500/15 text-amber-300 border-amber-400/30",
    description: "In our Boerne concierge queue for initial review.",
  },
  reviewing: {
    label: "Under Review",
    tone: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    description: "Our lead specialist is scoping your vehicle & materials.",
  },
  estimate_sent: {
    label: "Estimate Sent",
    tone: "bg-violet-500/15 text-violet-300 border-violet-400/30",
    description: "Tailored estimate delivered—ready for your approval.",
  },
  scheduled: {
    label: "Bay Scheduled",
    tone: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    description: "Your appointment slot is locked in our Boerne studio.",
  },
  in_bay: {
    label: "In Clean-Room Bay",
    tone: "bg-[#C9A46B]/20 text-[#E6CA99] border-[#C9A46B]/40",
    description: "Actively being prepped, coated, or wrapped by our team.",
  },
  completed: {
    label: "Completed & Delivered",
    tone: "bg-teal-500/15 text-teal-300 border-teal-400/30",
    description: "Finished inspection complete and ready for the road.",
  },
};
