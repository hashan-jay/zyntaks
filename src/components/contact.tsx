"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { servicePages } from "@/lib/service-pages";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TextReveal, FadeUp } from "@/components/ui/text-reveal";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
/** Web3Forms access keys are designed to be public in client forms. */
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "b41fc261-5a2b-4518-b75a-d5c28eb2c306";

const serviceOptions = servicePages.map((service) => service.shortTitle);

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  botcheck: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
  botcheck: "",
};

function formatWhatsAppDisplay(number: string) {
  if (number.length < 11) return `+${number}`;
  return `+${number.slice(0, 2)} ${number.slice(2, 4)} ${number.slice(4, 7)} ${number.slice(7)}`;
}

export function Contact() {
  const whatsappUrl = getWhatsAppUrl();
  const whatsappDisplay = formatWhatsAppDisplay(siteConfig.whatsappNumber);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "validation" | "error"
  >("idle");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status === "validation" || status === "error") {
      setStatus("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.botcheck) {
      setStatus("sent");
      return;
    }

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.service ||
      !form.message.trim()
    ) {
      setStatus("validation");
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Project inquiry — ${form.name.trim()} · ${form.service}`,
      from_name: "Zyntaks Website",
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || "Not provided",
      company: form.company.trim() || "Not provided",
      service: form.service,
      message: form.message.trim(),
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setStatus("error");
        return;
      }

      setForm(initialForm);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatedSection
      id="contact"
      atmosphere="signal"
      className="relative py-16 sm:py-24 lg:py-32"
    >
      <div className="section-divider absolute top-0 right-0 left-0 z-10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[var(--accent-yellow)] sm:text-sm">
            Contact
          </p>
          <TextReveal className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Let's build something remarkable
          </TextReveal>
          <FadeUp className="mt-3 text-base leading-relaxed text-zinc-400 sm:mt-4 sm:text-lg">
            Tell us about your project. We typically respond within 24 hours.
          </FadeUp>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 max-w-2xl sm:mt-16"
        >
          <div className="theme-card rounded-2xl p-5 backdrop-blur-sm sm:p-8 md:p-10">
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <span className="text-sm">✉</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-500">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 block break-all text-sm font-medium transition-colors hover:text-zinc-300 sm:text-base"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <span className="text-sm">◎</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-500">Location</p>
                  <p className="mt-1 text-sm font-medium sm:text-base">
                    {siteConfig.location}
                  </p>
                </div>
              </div>

              <div className="section-divider my-6 sm:my-8" />

              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"
                noValidate
              >
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  checked={!!form.botcheck}
                  onChange={(e) =>
                    updateField("botcheck", e.target.checked ? "1" : "")
                  }
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="inquiry-name" className="theme-label">
                      Full name *
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="theme-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-email" className="theme-label">
                      Email *
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="theme-input"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="inquiry-phone" className="theme-label">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="theme-input"
                      placeholder="+94 7X XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-company" className="theme-label">
                      Company
                    </label>
                    <input
                      id="inquiry-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      className="theme-input"
                      placeholder="Company or brand"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-service" className="theme-label">
                    Service interested in *
                  </label>
                  <select
                    id="inquiry-service"
                    name="service"
                    required
                    value={form.service}
                    onChange={(e) => updateField("service", e.target.value)}
                    className="theme-input"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiry-message" className="theme-label">
                    Project details *
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    required
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="theme-input"
                    placeholder="Goals, features, audience, links, or anything that helps us understand the build…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="theme-btn-primary group flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[3.25rem] sm:px-8 sm:text-base"
                >
                  {status === "sending" ? "Sending inquiry…" : "Send inquiry"}
                  {status !== "sending" && (
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  )}
                </button>

                {status === "sent" && (
                  <p className="text-center text-[11px] leading-relaxed text-[var(--accent)] sm:text-xs">
                    Inquiry sent. We&apos;ll get back to you within 24 hours.
                  </p>
                )}

                {status === "validation" && (
                  <p className="text-center text-[11px] leading-relaxed text-red-400 sm:text-xs">
                    Please fill in your name, email, service, and project
                    details.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-center text-[11px] leading-relaxed text-red-400 sm:text-xs">
                    Something went wrong. Please try again or email us at{" "}
                    {siteConfig.email}.
                  </p>
                )}

                {status === "idle" && (
                  <p className="text-center text-[11px] leading-relaxed text-zinc-600 sm:text-xs">
                    Your inquiry is delivered straight to our inbox — no email
                    app required.
                  </p>
                )}
              </form>

              <div className="section-divider my-2 sm:my-3" />

              <p className="text-center text-[11px] leading-relaxed text-zinc-500 sm:text-xs">
                Prefer WhatsApp?{" "}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline decoration-[var(--border-hover)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                >
                  Message us at {whatsappDisplay}
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
