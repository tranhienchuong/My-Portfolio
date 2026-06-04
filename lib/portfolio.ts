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
  slug: string;
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
  problem?: string;
  solution?: string;
  outcome?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "vietnamese-labor-law-ai-assistant",
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
    problem:
      "Vietnamese labor-law information is fragmented across official documents and related legal structures. A natural-language question needs an answer grounded in retrieved legal context, not unsupported model generation.",
    solution:
      "The project uses a scoped legal corpus, hybrid retrieval, legal graph expansion, grounded answer generation, and deterministic citation validation to produce legal-information responses.",
    outcome:
      "The project demonstrates how retrieval, graph context, and citation checks can make an AI assistant more grounded, transparent, and suitable for legal-information research.",
    note: "This project is a legal-information assistant and research project. It is not a replacement for professional legal advice.",
  },
  {
    slug: "gia-pha-viet",
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
    problem:
      "Family-history ideas can be difficult to turn into a clear mobile product structure without prototyping the interaction model first.",
    solution:
      "The project explores an Android/Kotlin mobile prototype generated from an AI Studio workflow and prepared for Gemini API configuration.",
    outcome:
      "The project demonstrates early mobile product exploration, Android project structure, and AI-assisted prototyping.",
    note: "This is an early-stage prototype and learning project, not a finished production app.",
  },
  {
    slug: "creative-portfolio-system",
    title: "Creative Portfolio System",
    type: "Personal Project",
    category: "Frontend / Motion Design",
    status: "In Progress",
    description:
      "A visual-first portfolio system built to explore color, motion, glassmorphism, responsive layout, and interactive UI.",
    longDescription:
      "A visual-first portfolio system built to explore color, motion, glassmorphism, responsive layout, and interactive UI while keeping content editable and components reusable.",
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
    problem:
      "A beginner portfolio can feel empty if it only lists projects without strong visual identity or interaction polish.",
    solution:
      "This portfolio uses dark neon visuals, glassmorphism, motion, responsive layout, and reusable components to turn the portfolio itself into a polished project.",
    outcome:
      "The project demonstrates frontend UI composition, component structure, responsive design, and motion-focused presentation.",
    note: "This is a personal portfolio system and visual experiment.",
  },
  {
    slug: "neon-analytics-dashboard",
    title: "Neon Analytics Dashboard",
    type: "UI Concept",
    category: "Dashboard / Interface Design",
    status: "Concept",
    description:
      "A glowing dashboard concept focused on responsive cards, animated numbers, glass panels, and dark interface polish.",
    longDescription:
      "A glowing dashboard concept focused on responsive cards, animated numbers, glass panels, and dark interface polish for a structured, scannable interface study.",
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
    problem:
      "Dashboard interfaces need to make dense information feel scannable, structured, and visually engaging.",
    solution:
      "The concept explores glowing cards, dark UI hierarchy, animated data blocks, and responsive dashboard layout patterns.",
    outcome:
      "The project demonstrates UI concepting, layout rhythm, card systems, and dashboard visual polish.",
    note: "This is a UI concept, not a production dashboard.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export const featuredCaseStudy = {
  eyebrow: "Featured Case Study",
  title: "Building a citation-aware Vietnamese labor-law AI assistant.",
  description:
    "A closer look at how the project combines retrieval, legal-document structure, graph expansion, and citation validation to produce grounded legal-information responses.",
  problem: {
    title: "The problem",
    text: "Vietnamese labor-law information is often fragmented across official documents, decrees, circulars, and legal interpretations. A user may ask a natural-language question, but the answer should still be grounded in relevant legal context instead of unsupported generation.",
  },
  solution: {
    title: "The solution",
    text: "The assistant uses a scoped legal corpus and retrieval-augmented generation flow. It retrieves relevant legal context, expands related legal concepts through a knowledge graph, and validates citations before producing a final response.",
  },
  architecture: [
    "User question",
    "Hybrid retrieval",
    "Legal graph expansion",
    "Grounded generation",
    "Citation validation",
    "Final answer",
  ],
  features: [
    "Scoped Vietnamese labor-law corpus",
    "Hybrid dense/sparse retrieval",
    "Legal knowledge graph expansion",
    "Grounded answer generation",
    "Deterministic citation validation",
    "Evaluation and reproducibility pipeline",
  ],
  techStack: [
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
  note: "This project is designed as a legal-information assistant and research project. It is not a replacement for professional legal advice.",
};

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
