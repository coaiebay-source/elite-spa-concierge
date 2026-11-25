import { count } from "drizzle-orm";
import { db } from "./index";
import {
  services,
  projects,
  testimonials,
  studioBuilds,
  quoteRequests,
} from "./schema";

const INITIAL_SERVICES = [
  {
    slug: "paint-protection-film",
    name: "Paint Protection Film (PPF)",
    shortTitle: "Paint Protection Film",
    tagline: "Self-healing optical urethane armor against Texas highway impact.",
    summary:
      "Clear or stealth-satin urethane film engineered to absorb rock chips, road debris, and harsh abrasion without altering factory depth.",
    description:
      "Built for Interstate 10, Highway 281, and spirited Hill Country drives. Our precision-plotted and custom-tucked paint protection film creates an optically invisible barrier that self-heals light wash marring with ambient heat while preserving original factory paint value.",
    category: "Protection",
    heroImage: "/images/service-ppf.jpg",
    startingPriceLabel: "From $1,250",
    turnaroundLabel: "1–4 Days",
    mobileEligible: false,
    featured: true,
    sortOrder: 1,
    highlights: [
      {
        title: "Impact Resistance",
        description:
          "Absorbs gravel strikes, sand blasting, and bug acids on high-impact zones like hoods, bumpers, fenders, and mirrors.",
      },
      {
        title: "Heat-Activated Self-Healing",
        description:
          "Elastomeric clear topcoat allows fine swirl marks and light abrasions to level back out under Texas sun or warm water.",
      },
      {
        title: "Tucked Architectural Edges",
        description:
          "Precision patterns paired with meticulous hand-wrapped edges wherever panel geometry permits for a seamless finish.",
      },
      {
        title: "High-Gloss or Stealth Satin",
        description:
          "Preserve wet factory gloss or transform gloss paint into a uniform, velvety satin finish with full physical protection.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Consultation & Coverage Mapping",
        description:
          "We inspect your paint under calibration lights and tailor coverage to your driving routes, vehicle lines, and longevity goals.",
      },
      {
        step: "02",
        title: "Decontamination & Prep",
        description:
          "Multi-stage hand wash, iron decontamination, clay bar treatment, and targeted spot polishing ensure spotless adhesion.",
      },
      {
        step: "03",
        title: "Clean-Room Installation",
        description:
          "Film is plotted and laid in our climate-controlled Boerne bay with disciplined alignment and clean edge wrapping.",
      },
      {
        step: "04",
        title: "Post-Heat Inspection & Cure",
        description:
          "Edges are inspected, post-heated, and verified before walkthrough, followed by a complimentary check-in after settling.",
      },
    ],
    packages: [
      {
        name: "Partial Front Shield",
        priceRange: "$1,250 – $1,650",
        duration: "1 Day",
        description:
          "Essential front-end highway defense for daily commuters.",
        includes: [
          "Front bumper & painted trim",
          "Leading 24 inches of hood & front fenders",
          "Side mirror caps & headlights",
        ],
      },
      {
        name: "Full Front Protection",
        badge: "Most Popular",
        priceRange: "$2,100 – $2,850",
        duration: "1–2 Days",
        description:
          "Seamless full-panel coverage with zero mid-hood seam lines.",
        includes: [
          "Full hood & full front fenders",
          "Complete front bumper & lower valance",
          "Mirror caps, headlights & wrapped edges",
        ],
      },
      {
        name: "Track & Hill Country Pack",
        priceRange: "$3,100 – $3,900",
        duration: "2–3 Days",
        description:
          "Extended rock-chip defense for wide-body and performance vehicles.",
        includes: [
          "Everything in Full Front Protection",
          "Full rocker panels & lower doors",
          "A-pillars, roofline leading edge & rear splash zones",
        ],
      },
      {
        name: "Full Vehicle Armor",
        badge: "Concours Choice",
        priceRange: "$5,800 – $8,500+",
        duration: "4–5 Days",
        description:
          "Complete bumper-to-bumper clear gloss or stealth satin transformation.",
        includes: [
          "Every exterior painted panel wrapped cleanly",
          "Choice of optical high-gloss or stealth satin film",
          "Ideal foundation for ceramic top-coating",
        ],
      },
    ],
    faqs: [
      {
        question: "Is PPF worth it in Texas?",
        answer:
          "Texas highways and Hill Country gravel roads are notoriously tough on modern water-based clear coats. Owners routinely protect high-impact front panels or full bodies to avoid costly repaints and preserve original paint.",
      },
      {
        question: "Can PPF and ceramic coating be combined?",
        answer:
          "Yes — it is our most requested combination. PPF absorbs physical rock impact on high-strike zones while a ceramic coating over the film and remaining panels maximizes gloss and makes washing effortless.",
      },
      {
        question: "Will the film yellow or peel over time?",
        answer:
          "Modern aliphatic urethane films are engineered for optical clarity and UV stability. We review manufacturer warranty terms and straightforward maintenance habits during your consultation.",
      },
    ],
  },
  {
    slug: "ceramic-coatings",
    name: "Ceramic Coatings",
    shortTitle: "Ceramic Coatings",
    tagline: "Liquid-glass hydrophobic depth engineered for relentless clarity.",
    summary:
      "Professional-grade SiO2 polymer barrier that bonds to clear coat for unmatched candy-like gloss, UV defense, and effortless maintenance.",
    description:
      "A true ceramic coating chemically cross-links with your paintwork to form a rigid, slick barrier against Texas UV radiation, acid rain, bug splatter, and road film. Water beads tightly and sheets away—keeping your finish looking freshly detailed far longer.",
    category: "Protection",
    heroImage: "/images/service-ceramic.jpg",
    startingPriceLabel: "From $895",
    turnaroundLabel: "1–2 Days",
    mobileEligible: false,
    featured: true,
    sortOrder: 2,
    highlights: [
      {
        title: "Extreme Hydrophobicity",
        description:
          "High contact angles cause water, mud, and dust to bead and rinse clean with significantly reduced wash effort.",
      },
      {
        title: "Deep Liquid Gloss",
        description:
          "Amplifies metallic flake pop and deepens dark colors into a crisp, reflective showroom finish.",
      },
      {
        title: "UV & Chemical Shield",
        description:
          "Helps defend clear coat against oxidation, bird droppings, tree sap, and harsh environmental fallout.",
      },
      {
        title: "Wheels, Glass & Trim Options",
        description:
          "Extend hydrophobic protection to brake-dust-prone alloy wheels, windshields, and exterior matte plastics.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Paint Depth & Condition Audit",
        description:
          "We inspect paint clarity under multi-Kelvin lighting to recommend the ideal preparation and polishing tier.",
      },
      {
        step: "02",
        title: "Decon & Machine Polishing",
        description:
          "Chemical and mechanical decontamination followed by machine polishing removes haze so we seal in true clarity.",
      },
      {
        step: "03",
        title: "Controlled Coating Application",
        description:
          "Applied panel by panel in our dust-controlled Boerne studio and hand-leveled for streak-free optical uniformity.",
      },
      {
        step: "04",
        title: "Infrared Cure & Care Kit Briefing",
        description:
          "Proper cure window verification plus straightforward maintenance guidance to maximize coating longevity.",
      },
    ],
    packages: [
      {
        name: "Essential 3-Year Ceramic",
        priceRange: "$895 – $1,195",
        duration: "1 Day",
        description:
          "Single-stage gloss enhancement paired with durable ceramic protection.",
        includes: [
          "Full wash & iron decontamination",
          "Gloss enhancement machine polish",
          "1 layer ceramic paint coating + glass sealant",
        ],
      },
      {
        name: "Signature 5-Year Ceramic",
        badge: "Most Popular",
        priceRange: "$1,395 – $1,850",
        duration: "1–2 Days",
        description:
          "Multi-layer showroom gloss with wheel face and trim coverage.",
        includes: [
          "1-stage swirl-reducing paint correction",
          "Multi-layer professional ceramic coating",
          "Wheel faces, exterior plastics & windshield coated",
        ],
      },
      {
        name: "Concours Reserve Package",
        badge: "Showroom Flagship",
        priceRange: "$2,150 – $2,900",
        duration: "2–3 Days",
        description:
          "Two-stage correction plus total exterior & interior ceramic preservation.",
        includes: [
          "2-stage paint correction for maximum clarity",
          "Flagship multi-layer ceramic coating + hydrophobic topcoat",
          "Wheels-off barrel & caliper coating + leather ceramic shield",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a ceramic coating stop rock chips?",
        answer:
          "No. Ceramic coatings offer chemical, UV, and wash-marring resistance plus unmatched gloss, but they cannot absorb gravel impacts. Pair ceramic coating with PPF on front impact zones for complete defense.",
      },
      {
        question: "Should paint be corrected before ceramic coating?",
        answer:
          "Almost always, yes. Even brand-new dealership vehicles frequently arrive with transport swirls. Polishing beforehand ensures the coating locks in mirror clarity rather than sealing in defects.",
      },
      {
        question: "Do I still need to wash my vehicle?",
        answer:
          "Yes, routine safe hand washes keep the hydrophobic top layer performing cleanly. Washing becomes dramatically faster because dirt struggles to bond.",
      },
    ],
  },
  {
    slug: "window-tint",
    name: "Nano-Ceramic Window Tint",
    shortTitle: "Window Tint",
    tagline: "Architectural glare control and serious Texas heat rejection.",
    summary:
      "Precision computer-cut ceramic window films engineered to block infrared heat, shield interiors from UV fading, and refine your silhouette.",
    description:
      "Texas summers demand more than dark dyed film. Our high-clarity carbon and nano-ceramic window films reject staggering levels of solar infrared energy while preserving crisp nighttime visibility and zero electronic signal interference.",
    category: "Comfort & Style",
    heroImage: "/images/service-tint.jpg",
    startingPriceLabel: "From $320",
    turnaroundLabel: "2–4 Hours",
    mobileEligible: false,
    featured: true,
    sortOrder: 3,
    highlights: [
      {
        title: "Infrared Heat Rejection",
        description:
          "Multi-layer ceramic films dramatically reduce cabin heat soak and help A/C systems cool faster in San Antonio heat.",
      },
      {
        title: "99% UV Ray Blocking",
        description:
          "Protects bespoke leather dashboards, Alcantara, stitching, and passengers from harsh ultraviolet damage.",
      },
      {
        title: "Zero Signal Interference",
        description:
          "Non-metallized ceramic construction keeps GPS, cellular, toll tags, and keyless entry working flawlessly.",
      },
      {
        title: "Micro-Edge Precision",
        description:
          "Clean shaved top edges and crisp dot-matrix finishing deliver an OEM factory-glass aesthetic.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Film & Shade Consultation",
        description:
          "Compare optical heat rejection, clarity, and VLT shades while reviewing Texas front-window compliance guidelines.",
      },
      {
        step: "02",
        title: "Precision Pattern Cutting",
        description:
          "Patterns are plotted digitally off the glass to keep blades away from delicate seals and moldings.",
      },
      {
        step: "03",
        title: "Clean-Bay Application",
        description:
          "Glass is deeply scrubbed, slip-applied, heat-shrunk cleanly on curved glass, and finished to crisp edges.",
      },
      {
        step: "04",
        title: "Final Light Inspection",
        description:
          "Every window is verified for optical clarity and we review the short cure window before rolling windows down.",
      },
    ],
    packages: [
      {
        name: "Color-Stable Carbon Film",
        priceRange: "$320 – $440",
        duration: "2–3 Hours",
        description:
          "Rich charcoal appearance with reliable glare and UV reduction.",
        includes: [
          "All side windows & rear glass",
          "Non-fading, non-purple carbon construction",
          "99% UV protection & glare control",
        ],
      },
      {
        name: "Pro Nano-Ceramic",
        badge: "Texas Favorite",
        priceRange: "$495 – $680",
        duration: "2–3 Hours",
        description:
          "Serious solar heat rejection tailored for South Texas summers.",
        includes: [
          "All side windows & rear glass in nano-ceramic",
          "High infrared heat rejection even in lighter VLT shades",
          "Signal-safe, low interior haze clarity",
        ],
      },
      {
        name: "Complete Solar Shield",
        badge: "Maximum Comfort",
        priceRange: "$750 – $980",
        duration: "3–4 Hours",
        description:
          "Full-perimeter ceramic tint including virtually clear windshield film.",
        includes: [
          "All side windows & rear glass in flagship ceramic",
          "Full clear ceramic windshield heat film (70%–80% VLT)",
          "Optional panoramic sunroof ceramic upgrade",
        ],
      },
    ],
    faqs: [
      {
        question: "How dark can window tint legally be in Texas?",
        answer:
          "Texas regulates Visible Light Transmission (VLT) by window position (commonly 25% net VLT on front side windows, with clear UV/IR options on the windshield). Because rules can change, confirm current Texas DPS rules before selection—we happily guide you through compliant shades.",
      },
      {
        question: "Can light tint still block serious heat?",
        answer:
          "Yes! With modern nano-ceramic technology, heat rejection comes from ceramic nanoparticles blocking infrared energy—not simply from making the glass dark.",
      },
      {
        question: "How long until I can roll my windows down?",
        answer:
          "Typically 48 to 72 hours depending on Texas humidity and sunlight. We provide exact cure guidance at delivery.",
      },
    ],
  },
  {
    slug: "vinyl-wraps",
    name: "Bespoke Vinyl Wraps",
    shortTitle: "Vinyl Wraps",
    tagline: "Reversible color transformations, chrome deletes, and satin accents.",
    summary:
      "Full color-change wraps, architectural satin finishes, and precision blackout trim accents executed with paint-like seam discipline.",
    description:
      "Express an unmistakable identity without committing to permanent paintwork. From satin emerald and frozen graphite to metallic champagne and crisp gloss-black chrome deletes, we disassemble trim carefully so edges tuck cleanly out of sight.",
    category: "Transformation",
    heroImage: "/images/service-wrap.jpg",
    startingPriceLabel: "From $450 (Accents) / $3,400 (Full)",
    turnaroundLabel: "1–5 Days",
    mobileEligible: false,
    featured: true,
    sortOrder: 4,
    highlights: [
      {
        title: "Unlimited Curated Finishes",
        description:
          "Choose from ultra-gloss, velvet satin, stealth matte, brushed metallic, and color-shift cast vinyl films.",
      },
      {
        title: "Chrome Delete & Trim Accents",
        description:
          "Modernize window trim, grilles, emblems, roofs, and mirror caps with crisp gloss or satin black finishes.",
      },
      {
        title: "Reversible Factory Preservation",
        description:
          "Shields original paint from everyday UV exposure and light abrasion while remaining safely removable.",
      },
      {
        title: "Clean Disassembly Standards",
        description:
          "Door handles, trim bezels, and badges are carefully handled so seams disappear into natural panel gaps.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Swatch & Vision Session",
        description:
          "Explore physical film swatches in natural Hill Country daylight and studio lighting to dial in your exact shade.",
      },
      {
        step: "02",
        title: "Deep Surface Prep & Trim Removal",
        description:
          "Every crevice, seal, and panel edge is thoroughly degreased and prepped so cast film bonds cleanly.",
      },
      {
        step: "03",
        title: "Artisan Panel Wrapping",
        description:
          "Controlled tension, zero over-stretching, and precision knifeless tape transitions deliver a paint-like look.",
      },
      {
        step: "04",
        title: "Post-Heat Memory Lock & Delivery",
        description:
          "Every recess and edge is post-heated to manufacturer specs to lock film memory for lasting durability.",
      },
    ],
    packages: [
      {
        name: "Chrome Delete & Accent Suite",
        priceRange: "$450 – $1,150",
        duration: "1 Day",
        description:
          "Clean blackout refinement for window moldings, grille surrounds, and roof panels.",
        includes: [
          "Window trim blackout in satin or gloss",
          "Optional roof wrap & mirror accents",
          "Precision knifeless trimming",
        ],
      },
      {
        name: "Full Exterior Color Change",
        badge: "Most Popular",
        priceRange: "$3,400 – $5,200",
        duration: "4–5 Days",
        description:
          "Complete exterior color transformation in premium cast vinyl.",
        includes: [
          "All exterior painted panels wrapped seamlessly",
          "Trim removal & reassembly for hidden edges",
          "Post-heat stabilization & wrap care briefing",
        ],
      },
      {
        name: "Bespoke Show Build (Wrap + Ceramic)",
        badge: "Collector Tier",
        priceRange: "$4,600 – $6,800+",
        duration: "5–6 Days",
        description:
          "Full color change including door jamb accents and vinyl-specific ceramic coating.",
        includes: [
          "Full exterior cast vinyl color change",
          "Vinyl-safe hydrophobic ceramic coating (preserves satin/matte sheen)",
          "Chrome delete & caliper accent options",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a vinyl wrap protect paint like PPF?",
        answer:
          "Vinyl wrap protects against UV fading and minor scuffs, but it is thinner than urethane PPF and not built to stop high-speed rock chips. We can layer clear PPF over high-impact wrapped areas if desired.",
      },
      {
        question: "Can a wrap be safely removed later?",
        answer:
          "Yes—quality cast vinyl applied over healthy OEM paint removes cleanly within its recommended service window, revealing preserved factory paint underneath.",
      },
      {
        question: "How do I wash a satin or matte wrap?",
        answer:
          "Hand wash with pH-neutral soaps free of gloss enhancers or waxes. Adding a matte-safe ceramic coating makes routine cleaning even simpler.",
      },
    ],
  },
  {
    slug: "mobile-detailing",
    name: "Mobile & In-Shop Detailing",
    shortTitle: "Mobile Detailing",
    tagline: "Showroom-grade interior rejuvenation and safe hand washing—at our studio or your residence.",
    summary:
      "Meticulous interior steam sanitization, leather nourishment, and exterior decontamination available in our Boerne bay or via mobile service.",
    description:
      "Whether maintaining a freshly coated exotic or revitalizing a family SUV, our detailing rituals use safe pH-neutral chemistry, ultra-plush microfiber, dry vapor steam, and matte-OEM leather conditioners—with qualifying mobile options across Boerne and Greater San Antonio.",
    category: "Care & Maintenance",
    heroImage: "/images/service-detailing.jpg",
    startingPriceLabel: "From $225",
    turnaroundLabel: "3–6 Hours",
    mobileEligible: true,
    featured: true,
    sortOrder: 5,
    highlights: [
      {
        title: "OEM-Matte Leather & Interior Care",
        description:
          "Gentle agitation and dry steam lift oils and grime from leather, Alcantara, and stitching without greasy dressings.",
      },
      {
        title: "Swirl-Safe Hand Wash & Decon",
        description:
          "Two-bucket foam bath, iron fallout removal, wheel barrel cleaning, and crisp tire satin dressing.",
      },
      {
        title: "Qualifying Mobile Convenience",
        description:
          "Available at your home or private office in Boerne and San Antonio where water, power, and shaded access allow.",
      },
      {
        title: "Coated-Vehicle Maintenance Plans",
        description:
          "Scheduled maintenance washes engineered specifically to keep PPF and ceramic coatings performing at peak slickness.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Condition & Access Review",
        description:
          "We confirm your vehicle's needs and verify whether in-shop or mobile detailing fits your location best.",
      },
      {
        step: "02",
        title: "Deep Interior Purification",
        description:
          "Compressed air purge, meticulous vacuuming, dry steam sanitization, fabric extraction, and leather conditioning.",
      },
      {
        step: "03",
        title: "Safe Exterior Decontamination",
        description:
          "Pre-wash snow foam, careful contact wash, door jambs, wheel faces & barrels, and SiO2 spray sealant.",
      },
      {
        step: "04",
        title: "White-Glove Walkthrough",
        description:
          "Final glass clarity check, subtle cabin finish, and a complete walkaround inspection together.",
      },
    ],
    packages: [
      {
        name: "Executive Refresh Detail",
        priceRange: "$225 – $295",
        duration: "2.5–3.5 Hours",
        description:
          "Ideal routine maintenance for well-kept daily drivers and coated vehicles.",
        includes: [
          "Foam hand wash, wheel cleaning & SiO2 topper",
          "Full vacuum, wipe-down & streak-free glass",
          "Matte UV interior protectant & jambs wiped",
        ],
      },
      {
        name: "Signature Full Restoration Detail",
        badge: "Most Popular",
        priceRange: "$375 – $495",
        duration: "4–6 Hours",
        description:
          "Deep top-to-bottom interior and exterior revitalization.",
        includes: [
          "Iron decon, clay treatment & 6-month polymer sealant",
          "Dry vapor steam sanitization & carpet/seat extraction",
          "Deep leather clean & matte OEM conditioning",
        ],
      },
      {
        name: "Concours Prep & Engine Bay",
        priceRange: "$550 – $725",
        duration: "Full Day",
        description:
          "Pre-sale, show-day, or collector-grade total rejuvenation.",
        includes: [
          "Everything in Signature Full Detail",
          "Safe engine bay degreasing & OEM satin dressing",
          "Single-pass gloss enhancement & exhaust tip polish",
        ],
      },
    ],
    faqs: [
      {
        question: "Where do you offer mobile detailing?",
        answer:
          "We offer qualifying mobile detailing in Boerne, Fair Oaks Ranch, The Dominion, and Greater San Antonio subject to service scope and on-site water/power/shade availability.",
      },
      {
        question: "Do you use shiny greasy dressings on interiors?",
        answer:
          "Never. We restore leather, vinyl, and dash trim to a clean, dry-to-the-touch factory satin finish.",
      },
      {
        question: "Can detailing be paired with ceramic coating?",
        answer:
          "Absolutely. A deep interior detail combined with exterior paint correction and ceramic coating is one of our favorite complete refresh packages.",
      },
    ],
  },
  {
    slug: "paint-correction",
    name: "Multi-Stage Paint Correction",
    shortTitle: "Paint Correction",
    tagline: "Surgical machine polishing to erase swirls, haze, and oxidation.",
    summary:
      "Precision multi-stage compounding and jeweling to restore breathtaking optical depth, mirror reflection, and crisp metallic clarity.",
    description:
      "Automated car washes, improper drying, and sun exposure leave microscopic scratches that scatter light and make paint look dull or milky. Using calibrated paint depth gauges and tailored pad-and-polish systems, we level clear coat defects safely to restore razor-sharp gloss.",
    category: "Correction",
    heroImage: "/images/service-correction.jpg",
    startingPriceLabel: "From $650",
    turnaroundLabel: "1–3 Days",
    mobileEligible: false,
    featured: true,
    sortOrder: 6,
    highlights: [
      {
        title: "Ultrasonic Thickness Measuring",
        description:
          "Every panel is measured before polishing to guarantee conservative, safe clear-coat preservation.",
      },
      {
        title: "Swirl & Hologram Elimination",
        description:
          "Removes spiderwebbing, buffer trails, water spot etching, and cloudy oxidation without filler waxes.",
      },
      {
        title: "True Inspection Transparency",
        description:
          "Panel wipe-downs remove polishing oils so you see honest, permanent defect removal under inspection lamps.",
      },
      {
        title: "Showroom Jeweling Finish",
        description:
          "Refines dark solids and intricate metallics to liquid clarity ready for PPF or ceramic coating.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Micron Mapping & Test Spot",
        description:
          "We measure clear coat thickness and dial in the least aggressive pad/compound combo that achieves optimal correction.",
      },
      {
        step: "02",
        title: "Decon & Trim Masking",
        description:
          "Thorough decontamination followed by careful masking of rubber seals, emblems, and sensitive edges.",
      },
      {
        step: "03",
        title: "Multi-Stage Machine Polishing",
        description:
          "Systematic cutting and jeweling passes restore crisp mirror reflection across every curve and pillar.",
      },
      {
        step: "04",
        title: "IPA Wipe & Protection Lock-In",
        description:
          "Oils are stripped to verify real correction, then sealed with your selected ceramic coating or sealant.",
      },
    ],
    packages: [
      {
        name: "Stage 1 Gloss Enhancement",
        priceRange: "$650 – $850",
        duration: "1 Day",
        description:
          "Single-step polish removing ~55–70% of light swirls and boosting rich clarity.",
        includes: [
          "Full wash & decontamination prep",
          "Single-stage rotary/DA refinement pass",
          "Panel wipe & durable SiO2 sealant",
        ],
      },
      {
        name: "Stage 2 Signature Correction",
        badge: "Most Popular",
        priceRange: "$1,150 – $1,650",
        duration: "2 Days",
        description:
          "Dedicated compounding + fine polishing removing ~80–90% of moderate defects.",
        includes: [
          "Paint depth mapping across all panels",
          "Two-stage cut & jewel correction process",
          "Ideal foundation prior to Ceramic Coating or PPF",
        ],
      },
      {
        name: "Concours Multi-Stage Revival",
        priceRange: "$1,900 – $2,800+",
        duration: "3+ Days",
        description:
          "Bespoke defect correction for collector cars, dark solid paints, and show entries.",
        includes: [
          "Targeted wet-sanding/spot leveling where safe",
          "Multi-stage compounding and ultra-fine jeweling",
          "Door pillars, tail lights & gloss trim polished",
        ],
      },
    ],
    faqs: [
      {
        question: "Can paint correction fix deep scratches down to primer?",
        answer:
          "If a scratch catches your fingernail and penetrates through the clear coat, polishing can soften its edges to make it less visible, though full elimination requires touch-up or repainting.",
      },
      {
        question: "Is polishing safe for my factory clear coat?",
        answer:
          "Yes—when executed responsibly using ultrasonic thickness gauges and matched pads. We always prioritize long-term clear coat health over reckless over-cutting.",
      },
    ],
  },
  {
    slug: "vehicle-restoration",
    name: "Vehicle Restoration & Revival",
    shortTitle: "Vehicle Restoration",
    tagline: "Respectful preservation and concours revival for cherished classics and modern icons.",
    summary:
      "Tailored cosmetic restoration, weathered paint revival, headlight optical restoration, brightwork polishing, and trim renewal.",
    description:
      "Classic and collector vehicles carry irreplaceable patina and history. Our Boerne studio offers patient, detail-obsessed revival services—from single-stage vintage paint resurrection and chrome polishing to weathered trim, leather rejuvenation, and dry-bay preservation.",
    category: "Restoration",
    heroImage: "/images/service-restoration.jpg",
    startingPriceLabel: "Custom Scoped",
    turnaroundLabel: "2–7 Days",
    mobileEligible: false,
    featured: true,
    sortOrder: 7,
    highlights: [
      {
        title: "Single-Stage & Vintage Paint Care",
        description:
          "Specialized conditioning oils and conservative polishing engineered for delicate classic lacquer and enamel.",
      },
      {
        title: "Optical Headlight Restoration",
        description:
          "Multi-grit wet refinement and UV ceramic sealing restore yellowed, hazy lenses back to crystal transparency.",
      },
      {
        title: "Chrome, Aluminum & Trim Revival",
        description:
          "Hand metal polishing and permanent trim restoration bring brightwork and faded seals back to life.",
      },
      {
        title: "Pre-Auction & Concours Prep",
        description:
          "Complete photo-ready visual presentation for Bring a Trailer, RM Sotheby's, or Texas Hill Country shows.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Collector Discovery Inspection",
        description:
          "We document originality, paint composition, trim fragility, and your preservation or auction objectives.",
      },
      {
        step: "02",
        title: "Bespoke Revival Plan",
        description:
          "Itemized scope covering exterior paint, brightwork, interior upholstery, glass, and engine compartment.",
      },
      {
        step: "03",
        title: "Patient Hand-Crafted Execution",
        description:
          "Slow, careful restoration respecting vintage materials and period-correct finishes.",
      },
      {
        step: "04",
        title: "Preservation Sealing & Handoff",
        description:
          "Finished with appropriate wax, sealant, or ceramic protection plus collector storage guidance.",
      },
    ],
    packages: [
      {
        name: "Headlight & Trim Clarity Revival",
        priceRange: "$250 – $550",
        duration: "Half Day",
        description:
          "Instant visual age reversal for weathered lenses and sun-bleached exterior trim.",
        includes: [
          "Multi-step lens sanding, polishing & ceramic UV coat",
          "Trim deep-cleaning & long-term satin restoration",
          "Chrome exhaust & emblem hand-polishing",
        ],
      },
      {
        name: "Auction & Concours Preparation",
        badge: "Collector Favorite",
        priceRange: "$1,600 – $3,500+",
        duration: "3–5 Days",
        description:
          "Comprehensive cosmetic revival tailored for collector presentation and listings.",
        includes: [
          "Tailored vintage or modern paint correction",
          "Engine bay, brightwork & wheel-arch detailing",
          "Full interior nourishment & preservation protection",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you work on original single-stage vintage paint?",
        answer:
          "Yes. We evaluate thickness carefully and use specialized non-aggressive nourishment and polishing techniques designed specifically for classic single-stage finishes.",
      },
      {
        question: "Can you prepare a classic car for an online collector auction?",
        answer:
          "Yes! Clean undercarriage presentation, engine bay dressing, corrected paint, and nourished interiors dramatically elevate collector appeal.",
      },
    ],
  },
  {
    slug: "overspray-undercarriage",
    name: "Overspray & Undercarriage",
    shortTitle: "Overspray & Undercarriage",
    tagline: "Precision airborne paint removal and meticulous chassis detailing.",
    summary:
      "Safe removal of industrial paint overspray, road paint, and tree sap paired with thorough undercarriage degreasing and preservation.",
    description:
      "Construction road paint, body-shop mist, and Hill Country gravel tar can make a pristine vehicle feel like sandpaper. We safely dissolve and remove stubborn overspray across paint, glass, and trim without harsh abrasives—and restore chassis and wheel wells to clean, show-ready condition.",
    category: "Specialty",
    heroImage: "/images/hero-gt.jpg",
    startingPriceLabel: "From $350",
    turnaroundLabel: "1–2 Days",
    mobileEligible: false,
    featured: true,
    sortOrder: 8,
    highlights: [
      {
        title: "Safe Overspray Decontamination",
        description:
          "Targeted solvents, dedicated decontamination media, and light polishing remove paint mist without damaging clear coat.",
      },
      {
        title: "Glass, Trim & Rubber Recovery",
        description:
          "Restores windshield wiper smoothness and cleans textured plastics affected by road striping or construction spray.",
      },
      {
        title: "Undercarriage Degreasing",
        description:
          "Thorough steam and safe degreaser cleaning of wheel wells, suspension arms, frame rails, and skid plates.",
      },
      {
        title: "Insurance-Friendly Documentation",
        description:
          "Clear condition photos and itemized estimates available when addressing construction or contractor overspray claims.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Contaminant Identification",
        description:
          "We test contaminant type (latex, enamel, epoxy, road tar, or concrete) to select the safest removal method.",
      },
      {
        step: "02",
        title: "Targeted Safe Extraction",
        description:
          "Step-by-step removal from paint, glass, trim, and wheels using dedicated chemistry and non-marring media.",
      },
      {
        step: "03",
        title: "Chassis & Wheel-Well Steam Clean",
        description:
          "Lift/access cleaning of undercarriage components, fender liners, and suspension hardware.",
      },
      {
        step: "04",
        title: "Refinement & Protective Dressing",
        description:
          "Follow-up gloss polish where needed plus clean, non-sticky protective finish for chassis and plastics.",
      },
    ],
    packages: [
      {
        name: "Undercarriage & Wheel-Well Revival",
        priceRange: "$350 – $650",
        duration: "1 Day",
        description:
          "Thorough steam wash and chassis rejuvenation for trucks, SUVs, and show vehicles.",
        includes: [
          "Deep wheel-well, suspension & frame degreasing",
          "High-temp steam rinse & tar removal",
          "Clean satin protective undercarriage finish",
        ],
      },
      {
        name: "Complete Overspray Remediation",
        badge: "Claim Ready",
        priceRange: "$550 – $1,450+",
        duration: "1–2 Days",
        description:
          "Full exterior overspray removal across paint, glass, and trim with documentation.",
        includes: [
          "Before/after photo documentation for contractor or insurance review",
          "Safe removal on paint, glass, chrome & plastics",
          "Gloss-restoring polish & protective sealant",
        ],
      },
    ],
    faqs: [
      {
        question: "Can paint overspray be removed without repainting my car?",
        answer:
          "In the vast majority of cases, yes! Prompt professional decontamination removes overspray safely while keeping your original factory finish intact.",
      },
      {
        question: "Do you provide estimates for construction or insurance overspray claims?",
        answer:
          "Yes. Bring your vehicle to our Boerne showroom for an assessment and itemized remediation quote.",
      },
    ],
  },
];

const INITIAL_PROJECTS = [
  {
    slug: "obsidian-gt-full-ppf-ceramic",
    title: "Obsidian GT — Full Body PPF & Ceramic Reserve",
    vehicle: "Porsche 911 Carrera GTS",
    year: "2024",
    serviceCategory: "PPF",
    servicesApplied: [
      "Full Vehicle Gloss PPF",
      "5-Year Ceramic Topcoat",
      "Pro Nano-Ceramic Tint (25%)",
    ],
    finishSummary: "Optical Liquid Gloss • Tucked Edges",
    turnaround: "5 Days",
    location: "Boerne, TX",
    imageUrl: "/images/hero-gt.jpg",
    featured: true,
    sortOrder: 1,
    notes:
      "Delivered directly from the dealership to our Boerne clean-room for seamless full-body paint protection film, wheel-off ceramic coating, and Texas-compliant nano-ceramic window tint.",
  },
  {
    slug: "satin-emerald-suv-wrap",
    title: "Satin Emerald-Bronze Full Transformation",
    vehicle: "Range Rover Autobiography",
    year: "2024",
    serviceCategory: "Vinyl Wraps",
    servicesApplied: [
      "Full Cast Vinyl Color Change",
      "Gloss Black Chrome Delete",
      "Matte-Safe Ceramic Coat",
    ],
    finishSummary: "Satin Emerald-Bronze Metallic",
    turnaround: "5 Days",
    location: "The Dominion, San Antonio",
    imageUrl: "/images/service-wrap.jpg",
    featured: true,
    sortOrder: 2,
    notes:
      "Complete color transformation from factory white into bespoke satin emerald-bronze with full gloss black trim blackout and matte-preserving hydrophobic coating.",
  },
  {
    slug: "front-track-pack-ppf-install",
    title: "Hill Country Track Pack PPF Armor",
    vehicle: "Aston Martin Vantage",
    year: "2023",
    serviceCategory: "PPF",
    servicesApplied: [
      "Track Pack PPF",
      "Stage 1 Polish",
      "Ceramic Glass Coating",
    ],
    finishSummary: "Invisible Self-Healing Urethane",
    turnaround: "3 Days",
    location: "Fair Oaks Ranch, TX",
    imageUrl: "/images/service-ppf.jpg",
    featured: true,
    sortOrder: 3,
    notes:
      "High-impact protection tailored for weekend Twisted Sisters drives—full front, rockers, A-pillars, and rear wheel-arch impact zones with custom tucked edges.",
  },
  {
    slug: "hydrophobic-ceramic-obsidian",
    title: "Mirror-Depth 5-Year Ceramic Seal",
    vehicle: "BMW M4 Competition",
    year: "2024",
    serviceCategory: "Ceramic",
    servicesApplied: [
      "Stage 2 Paint Correction",
      "Signature 5-Year Ceramic",
      "Wheel & Caliper Coating",
    ],
    finishSummary: "Ultra-Hydrophobic Wet Mirror",
    turnaround: "2 Days",
    location: "San Antonio, TX",
    imageUrl: "/images/service-ceramic.jpg",
    featured: true,
    sortOrder: 4,
    notes:
      "Eliminated dealership wash swirls with two-stage machine polishing before locking in extreme hydrophobic water beading and deep jet-black clarity.",
  },
  {
    slug: "nano-ceramic-tint-executive-coupe",
    title: "Solar-Shield Nano-Ceramic Glass Suite",
    vehicle: "Mercedes-AMG GT Coupe",
    year: "2024",
    serviceCategory: "Window Tint",
    servicesApplied: [
      "Pro Nano-Ceramic 25% Sides",
      "70% Clear Ceramic Windshield",
      "Sunroof Heat Film",
    ],
    finishSummary: "Architectural Charcoal • 99% UV Block",
    turnaround: "3 Hours",
    location: "Boerne, TX",
    imageUrl: "/images/service-tint.jpg",
    featured: true,
    sortOrder: 5,
    notes:
      "Complete perimeter infrared heat rejection engineered for 100°F+ South Texas afternoons without compromising crystal-clear night visibility.",
  },
  {
    slug: "bespoke-cockpit-detailing",
    title: "Quilted Leather & Carbon Interior Revival",
    vehicle: "Ferrari Roma",
    year: "2023",
    serviceCategory: "Detailing",
    servicesApplied: [
      "Signature Interior Steam & Leather Care",
      "Interior Leather Ceramic",
      "Swirl-Safe Maintenance Bath",
    ],
    finishSummary: "Dry OEM-Matte Saddle Leather",
    turnaround: "1 Day",
    location: "Alamo Heights, San Antonio",
    imageUrl: "/images/service-detailing.jpg",
    featured: true,
    sortOrder: 6,
    notes:
      "Delicate boar-hair brush agitation, vapor sanitization, and breathable matte leather protection preserving factory fragrance and texture.",
  },
  {
    slug: "sapphire-two-stage-correction",
    title: "Two-Stage Swirl Elimination & Jeweling",
    vehicle: "Corvette Z06",
    year: "2023",
    serviceCategory: "Paint Correction",
    servicesApplied: [
      "Stage 2 Paint Correction",
      "Gloss Trim Polishing",
      "Concours Ceramic Coating",
    ],
    finishSummary: "90%+ Defect Correction • Liquid Metallic",
    turnaround: "3 Days",
    location: "Boerne, TX",
    imageUrl: "/images/service-correction.jpg",
    featured: true,
    sortOrder: 7,
    notes:
      "Restored deep sapphire metallic brilliance after heavy swirl marring, stripping polishing oils to verify true optical perfection prior to sealing.",
  },
  {
    slug: "concours-classic-silver-restoration",
    title: "Hill Country Collector Concours Revival",
    vehicle: "Classic European Grand Tourer",
    year: "1968",
    serviceCategory: "Restoration",
    servicesApplied: [
      "Vintage Paint Revival",
      "Brightwork Hand Polishing",
      "Undercarriage Preservation",
    ],
    finishSummary: "Concours Racing Silver • Chrome Gleam",
    turnaround: "5 Days",
    location: "Texas Hill Country",
    imageUrl: "/images/service-restoration.jpg",
    featured: true,
    sortOrder: 8,
    notes:
      "Gentle single-stage paint revival, brightwork restoration, and engine compartment detailing completed ahead of regional concours exhibition.",
  },
];

const INITIAL_TESTIMONIALS = [
  {
    clientName: "Marcus H.",
    vehicle: "2024 Porsche 911 GTS",
    serviceName: "Full Front PPF & 5-Year Ceramic",
    location: "Boerne, TX",
    rating: 5,
    quote:
      "I drove straight from delivery to Elite Auto Spa in Boerne. You genuinely cannot find a single seam on the hood or fenders, and washing Hill Country bugs off takes five minutes now.",
    verified: true,
    featured: true,
  },
  {
    clientName: "Elena R.",
    vehicle: "2024 Range Rover Autobiography",
    serviceName: "Satin Vinyl Wrap & Nano-Ceramic Tint",
    location: "The Dominion, San Antonio",
    rating: 5,
    quote:
      "Their communication and craftsmanship feel like a private design studio. The satin finish looks factory-painted and the ceramic tint completely transformed cabin comfort in August heat.",
    verified: true,
    featured: true,
  },
  {
    clientName: "David & Claire T.",
    vehicle: "2023 Ford F-250 Platinum & BMW X5",
    serviceName: "Ceramic Coating & Mobile Detailing",
    location: "Fair Oaks Ranch, TX",
    rating: 5,
    quote:
      "We've trusted them with both of our vehicles. Zero pressure, transparent guidance on Texas tint compliance, and showroom-level attention to every stitch and trim edge.",
    verified: true,
    featured: true,
  },
  {
    clientName: "Grant W.",
    vehicle: "2023 Corvette Z06",
    serviceName: "Stage 2 Paint Correction & Track Pack PPF",
    location: "San Antonio, TX",
    rating: 5,
    quote:
      "Under their inspection lights I saw swirls I didn't even know were there from transport. When I picked it up three days later, the black paint looked ten feet deep.",
    verified: true,
    featured: true,
  },
];

const INITIAL_STUDIO_BUILDS = [
  {
    buildCode: "EAS-9110",
    vehicleType: "coupe",
    paintName: "Obsidian Metallic",
    paintHex: "#151922",
    finishType: "gloss",
    tintVlt: 25,
    ppfCoverage: "full_front",
    ceramicAddon: true,
    estimatedMin: 3890,
    estimatedMax: 5250,
    notes: "Full front PPF + 5-Year Ceramic + 25% Texas-compliant ceramic tint.",
  },
  {
    buildCode: "EAS-4402",
    vehicleType: "suv",
    paintName: "Hill Country Satin Emerald",
    paintHex: "#1F352E",
    finishType: "satin",
    tintVlt: 15,
    ppfCoverage: "track_pack",
    ceramicAddon: true,
    estimatedMin: 7100,
    estimatedMax: 9400,
    notes: "Full satin vinyl wrap aesthetic with track-pack armor & ceramic seal.",
  },
];

const INITIAL_QUOTES = [
  {
    quoteCode: "QTE-8412",
    studioBuildCode: "EAS-9110",
    clientName: "Harrison Vance",
    clientEmail: "h.vance@example.com",
    clientPhone: "(210) 555-0194",
    preferredContact: "text",
    vehicleYear: "2025",
    vehicleMake: "Porsche",
    vehicleModel: "911 Carrera S",
    vehicleBodyType: "coupe",
    servicesRequested: [
      "Paint Protection Film (PPF)",
      "Ceramic Coatings",
      "Nano-Ceramic Window Tint",
    ],
    serviceLocation: "boerne_showroom",
    preferredDate: "Next Tuesday",
    budgetRange: "$4,000 – $6,500",
    notes:
      "Picking up from dealership this Friday—would love to bring it straight in for full front PPF, 5-year ceramic, and 25% front tint.",
    status: "scheduled",
    shopNotes:
      "Bay 2 reserved Tuesday 9:00 AM. Full Front PPF + Signature 5-Yr Ceramic + Pro Nano-Ceramic Tint.",
    estimatedQuote: "$4,450",
  },
  {
    quoteCode: "QTE-7905",
    studioBuildCode: "EAS-4402",
    clientName: "Lauren Delgado",
    clientEmail: "lauren.d@example.com",
    clientPhone: "(830) 555-0148",
    preferredContact: "call",
    vehicleYear: "2024",
    vehicleMake: "Rivian",
    vehicleModel: "R1S Tri-Motor",
    vehicleBodyType: "suv",
    servicesRequested: ["Bespoke Vinyl Wraps", "Nano-Ceramic Window Tint"],
    serviceLocation: "boerne_showroom",
    preferredDate: "Flexible this month",
    budgetRange: "$5,000+",
    notes:
      "Interested in seeing satin emerald and stealth charcoal swatches in person at the Boerne showroom.",
    status: "estimate_sent",
    shopNotes:
      "Sent wrap + ceramic topcoat estimate; swatch appointment requested for Friday afternoon.",
    estimatedQuote: "$5,600 – $6,200",
  },
  {
    quoteCode: "QTE-7320",
    studioBuildCode: null,
    clientName: "Caleb Henderson",
    clientEmail: "caleb.h@example.com",
    clientPhone: "(210) 555-0177",
    preferredContact: "text",
    vehicleYear: "2023",
    vehicleMake: "Ford",
    vehicleModel: "F-150 Raptor",
    vehicleBodyType: "pickup",
    servicesRequested: [
      "Mobile & In-Shop Detailing",
      "Overspray & Undercarriage",
    ],
    serviceLocation: "mobile_boerne",
    preferredDate: "This Thursday",
    budgetRange: "$500 – $1,000",
    notes:
      "Need undercarriage flush after ranch roads plus full interior leather refresh. Covered 3-car driveway with power and water in Boerne.",
    status: "in_bay",
    shopNotes:
      "Currently undergoing undercarriage steam decon & Signature Full Detail.",
    estimatedQuote: "$785",
  },
];

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  const [{ value: serviceCount }] = await db
    .select({ value: count() })
    .from(services);

  if (serviceCount === 0) {
    await db
      .insert(services)
      .values(INITIAL_SERVICES)
      .onConflictDoNothing({ target: services.slug });
  }

  const [{ value: projectCount }] = await db
    .select({ value: count() })
    .from(projects);

  if (projectCount === 0) {
    await db
      .insert(projects)
      .values(INITIAL_PROJECTS)
      .onConflictDoNothing({ target: projects.slug });
  }

  const [{ value: testimonialCount }] = await db
    .select({ value: count() })
    .from(testimonials);

  if (testimonialCount === 0) {
    await db.insert(testimonials).values(INITIAL_TESTIMONIALS);
  }

  const [{ value: buildCount }] = await db
    .select({ value: count() })
    .from(studioBuilds);

  if (buildCount === 0) {
    await db
      .insert(studioBuilds)
      .values(INITIAL_STUDIO_BUILDS)
      .onConflictDoNothing({ target: studioBuilds.buildCode });
  }

  const [{ value: quoteCount }] = await db
    .select({ value: count() })
    .from(quoteRequests);

  if (quoteCount === 0) {
    await db
      .insert(quoteRequests)
      .values(INITIAL_QUOTES)
      .onConflictDoNothing({ target: quoteRequests.quoteCode });
  }
}

export async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = runSeed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}
