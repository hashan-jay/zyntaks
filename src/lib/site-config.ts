export const siteConfig = {
  name: "Zyntaks",
  legalName: "Zyntaks",
  tagline: "think. build. evolve.",
  motto: ["think.", "build.", "evolve."] as const,
  heroBadge: "Innovation studio · Ideas that shine",
  description:
    "Zyntaks is a software development and SEO company in Sri Lanka. We build Next.js web apps and deliver website SEO, technical SEO services, and website optimization that improve rankings, speed, and conversions.",
  heroDescription:
    "Software engineered for what comes next — web apps, SEO & performance, cloud, and digital products from idea to production.",
  /** Short entity line for AI / knowledge-graph disambiguation */
  entitySummary:
    "Zyntaks (zyntaks.lk) is a software development and SEO company in Sri Lanka. We design and ship web apps, Next.js SEO, technical SEO services, website optimization, cloud infrastructure, UI/UX engineering, APIs, and AI automation for startups and growing businesses. We are not related to any hypnosis, trance, or entertainment creator projects that share a similar name.",
  seoTitle:
    "Zyntaks — SEO Company Sri Lanka | Next.js SEO, Web Apps & Technical SEO",
  keywords: [
    "Zyntaks",
    "zyntaks.lk",
    "SEO company Sri Lanka",
    "Website SEO Sri Lanka",
    "Next.js SEO",
    "Technical SEO services",
    "Website optimization Sri Lanka",
    "SEO services Sri Lanka",
    "technical SEO Sri Lanka",
    "Next.js development Sri Lanka",
    "software development studio",
    "web application development",
    "React development company",
    "custom software Sri Lanka",
    "Core Web Vitals optimization",
    "remote software team",
  ],
  url: "https://www.zyntaks.lk",

  /** WhatsApp number (country code + number, no + or spaces) */
  whatsappNumber: "94741950145",
  whatsappMessage: "Hi Zyntaks! I'd like to discuss a project.",

  email: "zyntakslabs@gmail.com",
  location: "Sri Lanka · Global remote-first",
  areaServed: ["Sri Lanka", "Global"],

  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "#contact" },
  ],

  portfolio: [
    {
      slug: "fit-with-shyama",
      name: "Fit with Shyama",
      url: "https://fitwithshyama.xyz",
      year: "2026",
      role: "Product design & full-stack build",
      category: "Web Application",
      stack: ["React", "Vite", "TypeScript", "Responsive UI", "WhatsApp CTA"],
      heroImage: "/portfolio/fitwithshyama-hero.jpg",
      heroAlt:
        "Fit with Shyama homepage hero — Zumba and women's fitness in Wattala",
      intro:
        "A brand website for Fitness with Shyama — a women-focused Zumba and fitness studio in Nayakakanda, Wattala. The product helps prospective members discover classes, packages, and location details, then convert through WhatsApp.",
      problem:
        "Shyama’s studio relied on informal social messaging and word of mouth. Interested members had no clear digital home to understand the brand, see class energy, compare packages, or get directions — so inquiries were scattered and hard to convert into booked members.",
      solution:
        "Zyntaks designed and shipped a focused marketing web app with a high-energy hero, studio storytelling, package cards, social proof, map/location context, and a direct WhatsApp join flow. The result is a single shareable destination that turns curiosity into conversations with Shyama.",
    },
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
      id: "seo-performance",
      title: "SEO & Performance Optimization",
      description:
        "Website SEO in Sri Lanka — technical SEO, Next.js SEO, and performance optimization that turn search traffic into customers.",
      icon: "⟡",
      overview:
        "As an SEO company in Sri Lanka, Zyntaks combines technical SEO services with website optimization: crawlability, structured data, Core Web Vitals, and Next.js SEO so your product ranks higher and loads faster.",
      whatWeDo: [
        "Technical SEO audits: crawlability, indexation, metadata, sitemaps, and structured data",
        "Next.js SEO: App Router metadata, canonical URLs, SSR/SSG strategy, and edge-ready delivery",
        "Core Web Vitals tuning — LCP, CLS, INP — with measurable before/after targets",
        "On-page website SEO: content structure, internal linking, and search intent alignment",
        "Ongoing monitoring so regressions are caught before they cost traffic in Sri Lanka and globally",
      ],
      deliverables: [
        "Performance & SEO audit report with prioritized fixes",
        "Implemented website optimization in production",
        "Baseline metrics dashboard (CWV, Lighthouse, key SEO checks)",
        "Playbook for keeping speed and rankings healthy",
      ],
    },
    {
      id: "ai-automation",
      title: "AI Automation",
      description:
        "Intelligent workflows, assistants, and integrations that remove busywork from your operations.",
      icon: "✦",
      overview:
        "Zyntaks builds practical AI into your stack — automating repetitive work, surfacing insights, and connecting tools so your team ships more with less friction.",
      whatWeDo: [
        "Process discovery to find high-ROI automation opportunities",
        "LLM-powered assistants, chatbots, and internal knowledge tools",
        "Document, email, and CRM workflow automation with human-in-the-loop controls",
        "Secure API integrations between your product and AI providers",
        "Evaluation, prompt/version control, and cost-aware model selection",
      ],
      deliverables: [
        "Working automation or AI feature in production",
        "Integration docs and runbooks for your team",
        "Guardrails for privacy, quality, and cost control",
        "Iteration plan based on real usage metrics",
      ],
    },
    {
      id: "custom-software",
      title: "Custom Software Development",
      description:
        "Tailored systems built around your workflows — not off-the-shelf compromises.",
      icon: "⬢",
      overview:
        "When SaaS templates fall short, we engineer custom software that matches how your business actually works — from internal tools to customer-facing platforms.",
      whatWeDo: [
        "Requirements workshops and domain modeling with your stakeholders",
        "Custom web platforms, admin portals, and operational dashboards",
        "Legacy modernization and greenfield builds with a clear migration path",
        "Integrations with payment, ERP, CRM, and third-party systems",
        "Long-term maintainability: tests, docs, and ownership-friendly architecture",
      ],
      deliverables: [
        "Production custom software aligned to your workflows",
        "Source code, documentation, and deployment setup",
        "Admin/ops tooling where needed",
        "Support options for continued evolution",
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
    { value: "10+", label: "Projects delivered" },
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
