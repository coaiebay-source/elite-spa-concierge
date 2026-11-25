import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export interface ServiceHighlight {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicePackageTier {
  name: string;
  badge?: string;
  priceRange: string;
  duration: string;
  description: string;
  includes: string[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortTitle: text("short_title").notNull(),
  tagline: text("tagline").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  heroImage: text("hero_image").notNull(),
  startingPriceLabel: text("starting_price_label").notNull(),
  turnaroundLabel: text("turnaround_label").notNull(),
  mobileEligible: boolean("mobile_eligible").notNull().default(false),
  featured: boolean("featured").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  highlights: jsonb("highlights").$type<ServiceHighlight[]>().notNull(),
  processSteps: jsonb("process_steps").$type<ServiceProcessStep[]>().notNull(),
  packages: jsonb("packages").$type<ServicePackageTier[]>().notNull(),
  faqs: jsonb("faqs").$type<ServiceFaq[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  vehicle: text("vehicle").notNull(),
  year: text("year").notNull(),
  serviceCategory: text("service_category").notNull(),
  servicesApplied: jsonb("services_applied").$type<string[]>().notNull(),
  finishSummary: text("finish_summary").notNull(),
  turnaround: text("turnaround").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  notes: text("notes").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const studioBuilds = pgTable("studio_builds", {
  id: serial("id").primaryKey(),
  buildCode: text("build_code").notNull().unique(),
  vehicleType: text("vehicle_type").notNull(), // sedan | coupe | suv | pickup
  paintName: text("paint_name").notNull(),
  paintHex: text("paint_hex").notNull(),
  finishType: text("finish_type").notNull(), // gloss | satin | matte | color-shift
  tintVlt: integer("tint_vlt").notNull(), // 70 | 50 | 35 | 25 | 15 | 5
  ppfCoverage: text("ppf_coverage").notNull(), // none | partial_front | full_front | track_pack | full_vehicle
  ceramicAddon: boolean("ceramic_addon").notNull().default(false),
  estimatedMin: integer("estimated_min").notNull(),
  estimatedMax: integer("estimated_max").notNull(),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  quoteCode: text("quote_code").notNull().unique(),
  studioBuildCode: text("studio_build_code"),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone").notNull(),
  preferredContact: text("preferred_contact").notNull().default("text"), // call | text | email
  vehicleYear: text("vehicle_year").notNull(),
  vehicleMake: text("vehicle_make").notNull(),
  vehicleModel: text("vehicle_model").notNull(),
  vehicleBodyType: text("vehicle_body_type").notNull().default("coupe"),
  servicesRequested: jsonb("services_requested").$type<string[]>().notNull(),
  serviceLocation: text("service_location").notNull().default("boerne_showroom"), // boerne_showroom | mobile_boerne | mobile_san_antonio
  preferredDate: text("preferred_date").default(""),
  budgetRange: text("budget_range").default("Undecided"),
  notes: text("notes").default(""),
  status: text("status").notNull().default("received"), // received | reviewing | estimate_sent | scheduled | in_bay | completed
  shopNotes: text("shop_notes").default(""),
  estimatedQuote: text("estimated_quote").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  vehicle: text("vehicle").notNull(),
  serviceName: text("service_name").notNull(),
  location: text("location").notNull(),
  rating: integer("rating").notNull().default(5),
  quote: text("quote").notNull(),
  verified: boolean("verified").notNull().default(true),
  featured: boolean("featured").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ServiceRecord = typeof services.$inferSelect;
export type ProjectRecord = typeof projects.$inferSelect;
export type StudioBuildRecord = typeof studioBuilds.$inferSelect;
export type QuoteRequestRecord = typeof quoteRequests.$inferSelect;
export type TestimonialRecord = typeof testimonials.$inferSelect;
