"use client";

import { motion } from "framer-motion";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contact() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <AnimatedSection id="contact" className="relative py-20 sm:py-28 lg:py-36">
      <div className="section-divider absolute top-0 right-0 left-0" />

      <motion.div
        aria-hidden
        className="glow-orb top-1/2 left-1/2 h-[320px] w-[min(100vw,520px)] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/10 sm:h-[420px] sm:w-[640px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
              04 — Contact
            </p>
          </FadeUp>
          <TextReveal className="mt-4 font-display text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            {"Let's build something remarkable"}
          </TextReveal>
          <FadeUp delay={0.12}>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
              Tell us about your project. We typically respond within 24 hours.
            </p>
          </FadeUp>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-xl sm:mt-16"
        >
          <div className="theme-card overflow-hidden rounded-3xl p-6 backdrop-blur-sm sm:p-9">
            <div className="space-y-6">
              <motion.a
                href={`mailto:${siteConfig.email}`}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-theme hover:bg-white/[0.02]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-[var(--accent-yellow)]">
                  @
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm text-zinc-500">Email</p>
                  <p className="mt-1 break-all text-sm font-medium sm:text-base">
                    {siteConfig.email}
                  </p>
                </div>
              </motion.a>

              <div className="flex items-start gap-4 p-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-[var(--accent-yellow)]">
                  ◉
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm text-zinc-500">Location</p>
                  <p className="mt-1 text-sm font-medium sm:text-base">
                    {siteConfig.location}
                  </p>
                </div>
              </div>

              <div className="section-divider my-2" />

              <MagneticButton
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a] sm:gap-3 sm:px-8 sm:py-4 sm:text-base"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                Chat on WhatsApp
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </MagneticButton>

              <p className="text-center text-[11px] leading-relaxed text-zinc-600 sm:text-xs">
                Opens WhatsApp with a pre-filled message — edit before sending.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
