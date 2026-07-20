export const siteConfig = {
  name: "Zyntaks",
  tagline: "think. build. evolve.",
  motto: ["think.", "build.", "evolve."] as const,
  heroBadge: "Innovation studio · Ideas that shine",
  description:
    "We close the gap between the initial spark and shipping — modern web apps, cloud platforms, and digital products built with precision and lasting impact.",
  url: "https://zyntaks.com",

  /** WhatsApp number (country code + number, no + or spaces) */
  whatsappNumber: "94741950145",
  whatsappMessage: "Hi Zyntaks! I'd like to discuss a project.",

  email: "zyntakslabs@gmail.com",
  location: "Global · Remote-first",

  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  services: [
    {
      id: "web-applications",
      title: "Web Applications",
      description:
        "Full-stack products with Next.js, React, and modern APIs — fast, accessible, and built to scale.",
      icon: "◈",
      overview:
        "We design and build production-grade web applications from first commit to launch — and keep them evolving after go-live.",
      whatWeDo: [
        "Product discovery, information architecture, and technical scoping",
        "Full-stack development with Next.js, React, TypeScript, and modern APIs",
        "Authentication, roles, dashboards, and multi-tenant product flows",
        "Performance tuning, SEO foundations, and accessibility compliance",
        "Hosting setup, monitoring, and iterative feature delivery",
      ],
      deliverables: [
        "Responsive web app ready for production",
        "Clean codebase with documentation",
        "CI/CD pipeline and deployment guide",
        "Handoff + optional ongoing product support",
      ],
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      description:
        "Infrastructure, CI/CD pipelines, and deployment strategies that keep your systems reliable.",
      icon: "◎",
      overview:
        "Zyntaks sets up cloud infrastructure and delivery pipelines so your product ships safely, scales cleanly, and stays observable.",
      whatWeDo: [
        "Cloud architecture on AWS, Vercel, and container platforms",
        "CI/CD pipelines for automated build, test, and deploy",
        "Dockerization, environment management, and secret handling",
        "Uptime monitoring, logging, alerts, and rollback strategies",
        "Cost-aware infrastructure that matches your growth stage",
      ],
      deliverables: [
        "Production-ready cloud infrastructure",
        "Automated deployment pipelines",
        "Runbooks for releases and incidents",
        "Observability dashboards and alert rules",
      ],
    },
    {
      id: "ui-ux-engineering",
      title: "UI/UX Engineering",
      description:
        "Interfaces that feel effortless — motion, typography, and interaction design at production quality.",
      icon: "◇",
      overview:
        "We turn product goals into interfaces people enjoy using — designed with clarity, then engineered to feel fast and intentional.",
      whatWeDo: [
        "UX flows, wireframes, and interaction design for real user journeys",
        "High-fidelity UI systems with consistent typography and spacing",
        "Motion design that guides attention without slowing the product",
        "Responsive layouts tuned for mobile, tablet, and desktop",
        "Design-to-code implementation that preserves polish in production",
      ],
      deliverables: [
        "UI/UX prototypes and design system foundations",
        "Reusable component library patterns",
        "Motion and interaction guidelines",
        "Pixel-accurate production implementation",
      ],
    },
    {
      id: "mobile-solutions",
      title: "Mobile Solutions",
      description:
        "Cross-platform apps and responsive experiences that work seamlessly across every device.",
      icon: "▣",
      overview:
        "From mobile-first web experiences to cross-platform apps, we build products that feel native wherever your users are.",
      whatWeDo: [
        "Responsive and mobile-first web application experiences",
        "Cross-platform app architecture with shared business logic",
        "Touch-friendly UI patterns, offline-aware flows, and device APIs",
        "App store readiness, performance profiling, and release support",
        "Sync between mobile clients and backend services",
      ],
      deliverables: [
        "Mobile-optimized product experience",
        "Shared API contracts for web and mobile",
        "Release checklist and QA support",
        "Post-launch iteration plan",
      ],
    },
    {
      id: "api-development",
      title: "API Development",
      description:
        "Robust REST and GraphQL backends with clean architecture, security, and observability built in.",
      icon: "⬡",
      overview:
        "We build APIs that other systems can trust — secure, documented, and structured for long-term product growth.",
      whatWeDo: [
        "REST and GraphQL API design with clear domain boundaries",
        "Auth, rate limiting, validation, and secure data access",
        "Database modeling, migrations, and query optimization",
        "Webhook integrations, third-party connectors, and event flows",
        "API docs, versioning strategy, and observability hooks",
      ],
      deliverables: [
        "Production API with typed contracts",
        "Auth and permission model",
        "OpenAPI/GraphQL documentation",
        "Test coverage and monitoring setup",
      ],
    },
    {
      id: "consulting",
      title: "Consulting",
      description:
        "Technical audits, architecture reviews, and team augmentation when you need expert guidance.",
      icon: "◆",
      overview:
        "When you need clarity before (or during) a build, Zyntaks helps you make the right technical decisions and move faster with less risk.",
      whatWeDo: [
        "Architecture reviews and codebase health audits",
        "Roadmapping for MVPs, rebuilds, and scaling milestones",
        "Tech stack selection and vendor/tooling recommendations",
        "Pairing with your team for critical features or rescue work",
        "Delivery coaching: estimation, sprint focus, and quality gates",
      ],
      deliverables: [
        "Written audit findings and prioritized recommendations",
        "Architecture decision records",
        "Implementation roadmap",
        "Optional hands-on engineering support",
      ],
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
