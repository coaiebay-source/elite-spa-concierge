import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { QuoteModalProvider } from "@/components/QuoteModalProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Elite Auto Spa | PPF, Ceramic Coatings, Window Tint & Wraps in Boerne & San Antonio, TX",
  description:
    "Elite Auto Spa is a luxury automotive restyling studio in Boerne, TX serving Greater San Antonio and the Texas Hill Country. Paint protection film, ceramic coatings, nano-ceramic window tint, vinyl wraps, paint correction, mobile detailing, and classic restoration.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-[#06070A] font-sans text-[#F5F2EB] antialiased">
        <QuoteModalProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
