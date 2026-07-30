export type ServicePageFaq = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  eyebrow: string;
  heading: string;
  intro: string;
  whatItIs: {
    title: string;
    body: string;
    points: readonly string[];
  };
  whyNeedIt: {
    title: string;
    body: string;
    points: readonly string[];
  };
  benefits: readonly string[];
  technologies: readonly string[];
  faqs: readonly ServicePageFaq[];
};

export const servicePages = [
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Development",
    description:
      "Custom web development with Next.js and React — fast, secure, SEO-ready products built to scale.",
    icon: "◈",
    eyebrow: "Web development",
    heading: "Web development that ships products people actually use",
    intro:
      "Zyntaks designs and builds modern websites and web applications — from marketing sites to full-stack platforms — with performance, accessibility, and growth baked in from day one.",
    whatItIs: {
      title: "What web development is",
      body: "Web development is the design, engineering, and deployment of websites and web applications that run in the browser. At Zyntaks it covers product discovery, UI implementation, backend APIs, authentication, hosting, and ongoing iteration — not just a static page.",
      points: [
        "Marketing sites, dashboards, SaaS products, and customer portals",
        "Full-stack builds with Next.js, React, and modern APIs",
        "Responsive experiences tuned for mobile, tablet, and desktop",
        "Launch-ready hosting, monitoring, and maintainable codebases",
      ],
    },
    whyNeedIt: {
      title: "Why businesses need web development",
      body: "Your website is often the first sales conversation. Slow, outdated, or hard-to-use sites lose leads. Custom web development gives you a digital product that matches your workflows, brand, and growth goals — instead of forcing your business into a rigid template.",
      points: [
        "Convert visitors into inquiries, bookings, and paying customers",
        "Replace manual processes with secure online workflows",
        "Stay competitive with a fast, modern digital presence",
        "Own your product roadmap instead of fighting platform limits",
      ],
    },
    benefits: [
      "Faster load times and stronger Core Web Vitals",
      "SEO-friendly structure and metadata from the start",
      "Scalable architecture as traffic and features grow",
      "Clean TypeScript codebase your team can extend",
      "Secure auth, roles, and data handling when needed",
      "Clear handoff, docs, and optional ongoing support",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Vercel",
      "REST / GraphQL",
    ],
    faqs: [
      {
        question: "How long does a web development project take?",
        answer:
          "A focused marketing site can ship in weeks. A full web application usually takes several weeks to a few months depending on scope, integrations, and content readiness. We share a clear timeline after discovery.",
      },
      {
        question: "Do you rebuild existing websites or only build new ones?",
        answer:
          "Both. We modernize legacy sites, migrate to Next.js, and build greenfield products when starting fresh is the better path.",
      },
      {
        question: "Will my site be mobile-friendly and SEO-ready?",
        answer:
          "Yes. Responsive layout, performance basics, semantic structure, and SEO foundations are part of every Zyntaks web build.",
      },
      {
        question: "Can you maintain the site after launch?",
        answer:
          "Yes. We offer optional support for updates, feature work, monitoring, and performance improvements after go-live.",
      },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    shortTitle: "AI Automation",
    description:
      "Practical AI automation for workflows, assistants, and integrations that cut busywork and speed up operations.",
    icon: "✦",
    eyebrow: "AI automation",
    heading: "AI automation that removes busywork — not invents more of it",
    intro:
      "Zyntaks builds AI-powered workflows and assistants that plug into how your team already works. We focus on measurable time saved, clear guardrails, and systems your staff can trust.",
    whatItIs: {
      title: "What AI automation is",
      body: "AI automation uses models, rules, and integrations to handle repetitive tasks — drafting responses, classifying documents, routing requests, summarizing data, and connecting tools — while keeping humans in control of important decisions.",
      points: [
        "Internal assistants trained on your knowledge and processes",
        "Document, email, lead, and support workflow automation",
        "Secure connections between your product and AI providers",
        "Evaluation, monitoring, and cost-aware model choices",
      ],
    },
    whyNeedIt: {
      title: "Why businesses need AI automation",
      body: "Teams waste hours on copy-paste work, follow-ups, and status chasing. AI automation recovers that time, reduces errors, and lets people focus on judgment and customer relationships — without hiring a bigger ops team overnight.",
      points: [
        "Scale support and operations without linear headcount growth",
        "Respond faster to leads, tickets, and internal requests",
        "Reduce manual errors in repetitive data handling",
        "Turn scattered knowledge into searchable, usable assistance",
      ],
    },
    benefits: [
      "Hours saved on repetitive operational tasks",
      "Faster response times for customers and internal teams",
      "Human-in-the-loop controls for quality and compliance",
      "Integrations with the tools you already use",
      "Clear ROI tracking from real usage metrics",
      "Privacy-aware design and cost controls",
    ],
    technologies: [
      "OpenAI / LLM APIs",
      "Python",
      "Node.js",
      "TypeScript",
      "Vector search",
      "Webhooks",
      "REST APIs",
      "Workflow orchestration",
    ],
    faqs: [
      {
        question: "Is AI automation only for large enterprises?",
        answer:
          "No. Many high-ROI automations start small — lead routing, FAQ assistants, document summaries — and expand once value is proven.",
      },
      {
        question: "Will AI replace our staff?",
        answer:
          "Our approach is augmentation: automate repetitive work so your team can do higher-value tasks. Critical decisions stay with people.",
      },
      {
        question: "How do you keep AI outputs safe and accurate?",
        answer:
          "We add guardrails, retrieval from approved sources, review steps where needed, logging, and evaluation loops so quality stays measurable.",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "A clear process to automate, access to relevant tools or docs, and success metrics (time saved, response speed, error rate). We guide the rest.",
      },
    ],
  },
  {
    slug: "software-development",
    title: "Custom Software Development",
    shortTitle: "Software Development",
    description:
      "Custom software development tailored to your workflows — portals, platforms, and internal tools built to last.",
    icon: "⬢",
    eyebrow: "Software development",
    heading: "Custom software built around your business — not the other way around",
    intro:
      "When off-the-shelf tools fall short, Zyntaks engineers custom software that matches how you sell, operate, and serve customers — with clean architecture and a path to keep evolving.",
    whatItIs: {
      title: "What custom software development is",
      body: "Custom software development means designing and building applications specifically for your domain: admin portals, operational dashboards, booking systems, multi-tenant platforms, and internal tools that fit your rules instead of forcing workarounds.",
      points: [
        "Requirements workshops and domain modeling with stakeholders",
        "Web platforms, admin systems, and operational dashboards",
        "Integrations with payments, CRM, ERP, and third-party APIs",
        "Legacy modernization with a clear migration path",
      ],
    },
    whyNeedIt: {
      title: "Why businesses need custom software",
      body: "Spreadsheets, disconnected SaaS tools, and manual handoffs create slow processes and messy data. Custom software unifies workflows, enforces your business rules, and becomes an asset you own — not a monthly compromise.",
      points: [
        "Automate processes unique to your industry or company",
        "Reduce tool sprawl and duplicate data entry",
        "Improve visibility with dashboards and reporting",
        "Differentiate your product experience from competitors",
      ],
    },
    benefits: [
      "Software that matches your exact workflows",
      "Ownership of source code and product direction",
      "Integrations that connect your existing stack",
      "Architecture designed for long-term maintainability",
      "Security, roles, and audit trails where required",
      "A roadmap for continuous improvement after launch",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "REST / GraphQL",
    ],
    faqs: [
      {
        question: "Is custom software more expensive than SaaS?",
        answer:
          "Upfront investment is higher than a subscription, but custom software often pays off when SaaS fees, workarounds, and lost productivity cost more over time — or when differentiation matters.",
      },
      {
        question: "Do we own the code?",
        answer:
          "Yes. Engagements are structured so you own the delivered codebase and documentation unless a different arrangement is agreed in writing.",
      },
      {
        question: "Can you work with our existing developers?",
        answer:
          "Absolutely. We can lead the build, augment your team, or hand over a clean foundation for your engineers to extend.",
      },
      {
        question: "How do you manage scope and risk?",
        answer:
          "We start with discovery, ship in milestones, demo regularly, and keep a prioritized backlog so changes stay controlled and transparent.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile App Development",
    description:
      "Mobile app development for iOS, Android, and mobile-first web — polished experiences that feel native.",
    icon: "▣",
    eyebrow: "Mobile app development",
    heading: "Mobile experiences that feel native wherever your users are",
    intro:
      "Zyntaks builds mobile-first products and cross-platform apps so your customers can book, buy, track, and engage on the devices they already live on.",
    whatItIs: {
      title: "What mobile app development is",
      body: "Mobile app development covers native-feeling applications and mobile-optimized experiences — including cross-platform apps, progressive web apps, and responsive products deeply tuned for touch, performance, and offline-aware flows.",
      points: [
        "Cross-platform app architecture with shared business logic",
        "Mobile-first web and PWA experiences when an app store is not required",
        "Touch-friendly UI, device capabilities, and push-ready foundations",
        "Backend sync, auth, and release support for real-world usage",
      ],
    },
    whyNeedIt: {
      title: "Why businesses need mobile app development",
      body: "Most customers discover and engage on phones. If your product is awkward on mobile, you lose attention, trust, and conversions. A dedicated mobile experience meets users where they are and keeps your brand in their pocket.",
      points: [
        "Increase engagement with always-available mobile access",
        "Support field teams, customers, or members on the go",
        "Improve conversion on mobile traffic that already dominates",
        "Create a direct channel for updates, offers, and retention",
      ],
    },
    benefits: [
      "Consistent experience across phones and tablets",
      "Faster task completion with mobile-first UX",
      "Shared logic that reduces duplicate engineering work",
      "Performance profiling and release-ready quality checks",
      "API contracts that keep web and mobile in sync",
      "A clear plan for iteration after the first release",
    ],
    technologies: [
      "React Native",
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "REST APIs",
      "Push foundations",
      "App store readiness",
    ],
    faqs: [
      {
        question: "Do I need a native app or is mobile web enough?",
        answer:
          "It depends on your use case. Many products start with an excellent mobile-first web or PWA. We recommend a store app when you need deeper device features, retention loops, or marketplace presence.",
      },
      {
        question: "Can one codebase cover iOS and Android?",
        answer:
          "Yes. We often use cross-platform approaches so you ship both platforms from a shared foundation while keeping platform-specific polish where it matters.",
      },
      {
        question: "Will the app work offline?",
        answer:
          "Where the product needs it, we design offline-aware flows and sync strategies. Not every app requires full offline mode — we scope that intentionally.",
      },
      {
        question: "Do you help with App Store and Play Store submission?",
        answer:
          "Yes. We support release checklists, store assets guidance, and submission readiness as part of the launch process.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX Design",
    description:
      "UI/UX design and engineering — clear flows, polished interfaces, and production-ready implementation.",
    icon: "◇",
    eyebrow: "UI/UX design",
    heading: "UI/UX design that makes complex products feel simple",
    intro:
      "Zyntaks turns business goals into interfaces people understand quickly — then engineers them so the polish survives in production, not just in a prototype file.",
    whatItIs: {
      title: "What UI/UX design is",
      body: "UI/UX design is the practice of shaping how a product looks, flows, and feels. UX focuses on user journeys and clarity; UI focuses on visual hierarchy, typography, components, and interaction. We connect both to real engineering.",
      points: [
        "User flows, wireframes, and interaction design",
        "High-fidelity UI systems with consistent spacing and type",
        "Motion that guides attention without slowing the product",
        "Design-to-code implementation that preserves intended quality",
      ],
    },
    whyNeedIt: {
      title: "Why businesses need UI/UX design",
      body: "Beautiful pixels are not enough. Confusing flows kill conversion and support tickets pile up. Strong UI/UX reduces friction, builds trust, and helps customers complete the jobs they came to do.",
      points: [
        "Increase conversion with clearer paths to action",
        "Reduce support load caused by confusing interfaces",
        "Present a premium brand experience on every device",
        "Align product, design, and engineering around one system",
      ],
    },
    benefits: [
      "Interfaces that feel intentional and easy to navigate",
      "Reusable design system foundations for faster iteration",
      "Responsive layouts that hold up on real devices",
      "Motion and micro-interactions with purpose",
      "Fewer redesign surprises during development",
      "Production UI that matches the approved design quality",
    ],
    technologies: [
      "Figma",
      "Design systems",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Accessibility (a11y)",
      "Responsive UI",
    ],
    faqs: [
      {
        question: "Do you only design, or also implement?",
        answer:
          "Both. We can deliver design artifacts, implement production UI, or run the full design-to-code path so nothing is lost in handoff.",
      },
      {
        question: "Can you improve an existing product without a full redesign?",
        answer:
          "Yes. Many engagements start with UX audits, conversion fixes, and targeted UI upgrades before a broader redesign.",
      },
      {
        question: "How do you validate design decisions?",
        answer:
          "We ground designs in goals and user journeys, review flows with stakeholders, and iterate from feedback and analytics after launch.",
      },
      {
        question: "Do you create design systems?",
        answer:
          "Yes. For products that will grow, we establish reusable components, spacing, type, and interaction patterns so future features stay consistent.",
      },
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    shortTitle: "Digital Transformation",
    description:
      "Digital transformation services — modernize processes, platforms, and cloud delivery so your business can scale.",
    icon: "◎",
    eyebrow: "Digital transformation",
    heading: "Digital transformation that modernizes how your business runs",
    intro:
      "Zyntaks helps teams move from manual, fragmented, or aging systems to modern digital platforms — with cloud, automation, and product thinking that make change stick.",
    whatItIs: {
      title: "What digital transformation is",
      body: "Digital transformation is the shift from outdated processes and technology to connected digital systems: better software, cloud infrastructure, automated workflows, and data visibility that support faster decisions and better customer experiences.",
      points: [
        "Process discovery and digital opportunity mapping",
        "Platform modernization and workflow digitization",
        "Cloud & DevOps foundations for reliable delivery",
        "Change-friendly roadmaps your team can execute",
      ],
    },
    whyNeedIt: {
      title: "Why businesses need digital transformation",
      body: "Markets move faster than paper processes and brittle legacy tools. Without digital transformation, growth creates chaos — more staff, more errors, slower service. Modern systems let you scale quality, not just headcount.",
      points: [
        "Replace fragile manual processes with reliable digital flows",
        "Improve customer experience across web and operations",
        "Gain visibility with better data and reporting",
        "Reduce risk from outdated, unsupported technology",
      ],
    },
    benefits: [
      "Clear roadmap from current state to modern operations",
      "Faster delivery with CI/CD and cloud best practices",
      "Lower operational friction across teams",
      "Systems that integrate instead of living in silos",
      "Improved uptime, security, and observability",
      "A foundation for AI, analytics, and future products",
    ],
    technologies: [
      "AWS",
      "Vercel",
      "Docker",
      "CI/CD",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Monitoring & logging",
    ],
    faqs: [
      {
        question: "Where should digital transformation start?",
        answer:
          "Usually with the highest-friction process that affects revenue or customer experience. We identify quick wins and structural upgrades so momentum builds early.",
      },
      {
        question: "Do we have to replace everything at once?",
        answer:
          "No. We prefer phased modernization — stabilize, digitize critical paths, then expand — so the business keeps running during change.",
      },
      {
        question: "Is cloud migration part of this?",
        answer:
          "Often yes. Cloud and DevOps are common pillars: safer deployments, better scaling, and clearer operational ownership.",
      },
      {
        question: "How do you keep teams aligned during transformation?",
        answer:
          "We document decisions, demo progress frequently, train stakeholders on new workflows, and keep the roadmap visible so change is manageable.",
      },
    ],
  },
] as const satisfies readonly ServicePage[];

export type ServicePageSlug = (typeof servicePages)[number]["slug"];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug) ?? null;
}

export function getServicePageSlugs() {
  return servicePages.map((service) => service.slug);
}
