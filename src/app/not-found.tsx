import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you requested could not be found on ${siteConfig.name}.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative flex flex-1 flex-col items-center justify-center px-4 py-32 text-center sm:px-6"
      >
        <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[var(--accent-yellow)]">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
          That URL is not part of {siteConfig.name}. Head home or explore our
          services and portfolio.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="theme-btn-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold"
          >
            Back to home
          </Link>
          <Link
            href="/portfolio"
            className="theme-btn-secondary inline-flex h-12 items-center justify-center rounded-full border px-8 text-sm font-semibold"
          >
            View portfolio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
