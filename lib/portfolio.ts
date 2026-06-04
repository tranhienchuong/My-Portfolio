export const profile = {
  name: "Chuong Tran",
  role: "Frontend Developer",
  location: "Ho Chi Minh City, Vietnam",
  summary:
    "I build polished, accessible web interfaces with a focus on maintainable systems, thoughtful details, and reliable user flows.",
  email: "hello@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Resume", href: "/resume.pdf" },
  ],
};

export const stats = [
  { label: "Focus", value: "UI Systems" },
  { label: "Stack", value: "Next.js" },
  { label: "Mode", value: "Remote" },
];

export type Project = {
  title: string;
  type: string;
  category: string;
  status: string;
  description: string;
  longDescription?: string;
  tags: string[];
  highlights: string[];
  href?: string;
  featured?: boolean;
  visualType?: "legal-ai" | "mobile" | "portfolio" | "dashboard";
};

export const projects: Project[] = [
  {
    title: "Vietnamese Labor Law AI Assistant",
    type: "Featured Project",
    category: "AI / LegalTech / Thesis Project",
    status: "Research Project",
    description:
      "A scoped Vietnamese labor-law question-answering assistant that combines retrieval-augmented generation, hybrid retrieval, legal graph expansion, grounded answer generation, and citation validation.",
    longDescription:
      "This project explores how AI can help users search and understand Vietnamese labor-law documents in a controlled, citation-aware way. The assistant retrieves legal context, expands it through a legal knowledge graph, and validates citations before producing a grounded answer.",
    tags: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Qdrant",
      "Neo4j",
      "RAG",
      "GraphRAG",
      "LLM",
    ],
    highlights: [
      "Scoped Vietnamese labor-law corpus",
      "Hybrid dense/sparse retrieval with Qdrant",
      "Legal graph expansion with Neo4j",
      "Grounded answer generation",
      "Deterministic citation validation",
      "Evaluation and reproducibility pipeline",
    ],
    href: "https://github.com/tranhienchuong/vietnamese-labor-law-ai-assistant",
    featured: true,
    visualType: "legal-ai",
  },
  {
    title: "Gia Phả Việt",
    type: "Mobile Prototype",
    category: "Android / AI Studio / Personal Project",
    status: "In Progress",
    description:
      "An Android/Kotlin mobile app experiment for exploring a Vietnamese family-tree product idea, connected to an AI Studio workflow and Gemini API setup.",
    longDescription:
      "Gia Phả Việt is an early-stage mobile product experiment. It is presented as a prototype and learning project, not as a finished production app.",
    tags: ["Kotlin", "Android Studio", "Gemini API", "AI Studio", "Mobile App"],
    highlights: [
      "Android/Kotlin codebase",
      "AI Studio generated workflow",
      "Gemini API environment setup",
      "Mobile prototype structure",
    ],
    href: "https://github.com/tranhienchuong/gia-pha-viet",
    featured: true,
    visualType: "mobile",
  },
  {
    title: "Creative Portfolio System",
    type: "Personal Project",
    category: "Frontend / Motion Design",
    status: "In Progress",
    description:
      "A visual-first portfolio system built to explore color, motion, glassmorphism, responsive layout, and interactive UI.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "GSAP"],
    highlights: [
      "Dark neon visual system",
      "Smooth scroll and reveal animations",
      "Reusable UI components",
      "Responsive layout",
    ],
    href: "#",
    featured: false,
    visualType: "portfolio",
  },
  {
    title: "Neon Analytics Dashboard",
    type: "UI Concept",
    category: "Dashboard / Interface Design",
    status: "Concept",
    description:
      "A glowing dashboard concept focused on responsive cards, animated numbers, glass panels, and dark interface polish.",
    tags: ["Next.js", "Tailwind CSS", "Motion"],
    highlights: [
      "Glassmorphism dashboard cards",
      "Dark UI composition",
      "Animated data blocks",
      "Responsive layout concept",
    ],
    href: "#",
    featured: false,
    visualType: "dashboard",
  },
];

export const experiments = [
  {
    title: "Neon Command Palette",
    label: "UI Concept",
    description:
      "A keyboard-first overlay concept exploring glass panels, glow states, and compact navigation patterns.",
    tags: ["Interaction", "Glass UI", "Prototype"],
  },
  {
    title: "Gradient Card System",
    label: "Personal Experiment",
    description:
      "Reusable card treatments for colorful portfolio surfaces without overwhelming the content hierarchy.",
    tags: ["Visual System", "Tailwind", "Components"],
  },
  {
    title: "Responsive Lab Layout",
    label: "Practice Project",
    description:
      "A study in responsive spacing, section rhythm, and readable layouts across mobile and desktop screens.",
    tags: ["Responsive", "Layout", "Frontend"],
  },
];

export const processSteps = [
  {
    title: "Explore",
    description:
      "Collect references, define the interaction goal, and keep the idea honest to the project scope.",
  },
  {
    title: "Structure",
    description:
      "Break the interface into reusable components, editable content, and predictable layout rules.",
  },
  {
    title: "Polish",
    description:
      "Refine contrast, spacing, motion, and responsive behavior without adding unnecessary complexity.",
  },
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "CSS Architecture",
  "Accessibility",
  "Design Systems",
  "Performance",
];

export const experience = [
  {
    company: "Independent Projects",
    role: "Frontend Developer",
    period: "2024 - Present",
    description:
      "Designing and building modern web experiences with clear structure, responsive layouts, and reusable components.",
  },
  {
    company: "Learning Lab",
    role: "Web Developer",
    period: "2023 - 2024",
    description:
      "Practiced product-focused frontend development across React, styling systems, and production workflows.",
  },
];
