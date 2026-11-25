import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#06070A] px-6 py-32 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A46B]/40 bg-[#12161F]">
        <Shield className="h-6 w-6 text-[#C9A46B]" />
      </div>
      <p className="mt-6 text-xs font-semibold tracking-[0.28em] text-[#C9A46B] uppercase">
        404 · Showroom Bay Not Found
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium text-[#F5F2EB] sm:text-5xl">
        Let&apos;s get you back to the studio.
      </h1>
      <p className="mt-4 max-w-md text-sm text-[#9AA2B2]">
        The page or service bay you requested isn&apos;t here. Return to Elite
        Auto Spa to explore our Vehicle Studio, services, or track your build.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C9A46B] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-[#06070A] uppercase transition hover:bg-[#DFBD84]"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Showroom
      </Link>
    </div>
  );
}
