export const siteConfig = {
  name: "Zyntaks",
  tagline: "think. build. evolve.",
  motto: ["think.", "build.", "evolve."] as const,
  heroBadge: "Innovation studio · Ideas that shine",
  description:
    "Zyntaks builds modern web applications, cloud platforms, and digital products with precision, speed, and lasting impact.",
  url: "https://zyntaks.com",

  /** WhatsApp number (country code + number, no + or spaces) */
  whatsappNumber: "94741950145",
  whatsappMessage: "Hi Zyntaks! I'd like to discuss a project.",

  email: "hello@zyntaks.com",
  location: "Global · Remote-first",

  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  services: [
    {
      title: "Web Applications",
      description:
        "Full-stack products with Next.js, React, and modern APIs — fast, accessible, and built to scale.",
      icon: "◈",
    },
    {
      title: "Cloud & DevOps",
      description:
        "Infrastructure, CI/CD pipelines, and deployment strategies that keep your systems reliable.",
      icon: "◎",
    },
    {
      title: "UI/UX Engineering",
      description:
        "Interfaces that feel effortless — motion, typography, and interaction design at production quality.",
      icon: "◇",
    },
    {
      title: "Mobile Solutions",
      description:
        "Cross-platform apps and responsive experiences that work seamlessly across every device.",
      icon: "▣",
    },
    {
      title: "API Development",
      description:
        "Robust REST and GraphQL backends with clean architecture, security, and observability built in.",
      icon: "⬡",
    },
    {
      title: "Consulting",
      description:
        "Technical audits, architecture reviews, and team augmentation when you need expert guidance.",
      icon: "◆",
    },
  ],

  stats: [
    { value: "50+", label: "Projects delivered" },
    { value: "99.9%", label: "Uptime average" },
    { value: "24/7", label: "Support available" },
    { value: "100%", label: "Client satisfaction" },
  ],

  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Tailwind CSS",
    "GraphQL",
    "Python",
    "Kubernetes",
    "Vercel",
  ],

  process: [
    {
      step: "01",
      title: "Discover",
      description: "We map your goals, users, and constraints into a clear product vision.",
    },
    {
      step: "02",
      title: "Design",
      description: "Wireframes and prototypes that validate ideas before a single line of code.",
    },
    {
      step: "03",
      title: "Build",
      description: "Iterative development with transparent milestones and weekly demos.",
    },
    {
      step: "04",
      title: "Launch",
      description: "Deployment, monitoring, and handoff — plus ongoing support when you need it.",
    },
  ],
} as const;

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}
