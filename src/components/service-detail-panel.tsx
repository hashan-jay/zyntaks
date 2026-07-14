"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getWhatsAppUrl, siteConfig } from "@/lib/site-config";

export type ServiceItem = (typeof siteConfig.services)[number];

type ServiceDetailPanelProps = {
  service: ServiceItem | null;
  onClose: () => void;
};

export function ServiceDetailPanel({ service, onClose }: ServiceDetailPanelProps) {
  useEffect(() => {
    if (!service) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service ? (
        <motion.div
          key={service.id}
          className="fixed inset-0 z-[10000] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close service details"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`service-title-${service.id}`}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="theme-card relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border bg-[var(--surface)] shadow-2xl sm:max-h-[85vh] sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-theme px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <span className="text-2xl text-zinc-500">{service.icon}</span>
                <h3
                  id={`service-title-${service.id}`}
                  className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  {service.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">{service.description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-theme text-lg text-zinc-400 transition-colors hover:border-[var(--border-hover)] hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-base leading-relaxed text-zinc-400">
                {service.overview}
              </p>

              <div className="mt-7">
                <h4 className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  What Zyntaks will do
                </h4>
                <ul className="mt-3 space-y-3">
                  {service.whatWeDo.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-yellow)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <h4 className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  What you get
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-theme bg-[var(--card-bg)] px-3.5 py-3 text-sm leading-relaxed text-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-theme px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
              <button
                type="button"
                onClick={onClose}
                className="theme-btn-secondary inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-medium"
              >
                Close
              </button>
              <a
                href={getWhatsAppUrl(
                  `Hi Zyntaks! I'd like to discuss ${service.title}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-btn-primary inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium"
              >
                Talk about this →
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
