export type PortfolioLink = {
  label: string
  href: string
  display?: string
}

export type ProjectMetric = {
  value: string
  label: string
  detail?: string
}

export type ProjectImage = {
  src: string
  alt: string
}

export type PortfolioProject = {
  slug: "labor-law-ai" | "traffic-rl"
  eyebrow: string
  title: string
  summary: string
  role: string
  ownership: string
  problem: string
  approach: string[]
  outcome: string
  metrics: ProjectMetric[]
  stack: string[]
  repository: string
  live?: string
  cover: ProjectImage
  gallery: ProjectImage[]
  nextSteps: string[]
}

export type PortfolioContent = {
  person: {
    name: string
    shortName: string
    role: string
    headline: string
    introduction: string
    availability: string
    avatar: string
  }
  navigation: Array<{ label: string; href: string }>
  links: {
    github: PortfolioLink
    email: PortfolioLink
    phone: PortfolioLink
    facebook: PortfolioLink
    linkedin?: PortfolioLink
  }
  capabilities: Array<{
    number: string
    title: string
    description: string
    tools: string[]
  }>
  notes: Array<{
    label: string
    title: string
    summary: string
  }>
  projects: PortfolioProject[]
}

/**
 * The portfolio's only content seam. Layout modules consume this object and do
 * not know where the copy came from, so links and facts can be updated safely.
 */
export const portfolioContent = {
  person: {
    name: "Tran Hien Chuong",
    shortName: "HC",
    role: "Applied AI Engineer",
    headline: "I build AI systems that answer with evidence—not confidence alone.",
    introduction:
      "A curious new graduate working across LLM applications, retrieval, evaluation, and reinforcement learning. I turn ambiguous ideas into testable systems, then stay for the failure analysis.",
    availability: "Open to Applied AI Engineering opportunities",
    avatar: "https://avatars.githubusercontent.com/u/118324170?v=4",
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Notes", href: "#notes" },
    { label: "About", href: "#about" },
  ],
  links: {
    email: {
      label: "Gmail",
      display: "tranchuong.work@gmail.com",
      href: "mailto:tranchuong.work@gmail.com",
    },
    phone: {
      label: "Phone",
      display: "0815355874",
      href: "tel:+84815355874",
    },
    facebook: {
      label: "Facebook",
      display: "tran.chuongg.5",
      href: "https://www.facebook.com/tran.chuongg.5/",
    },
    github: {
      label: "GitHub",
      display: "tranhienchuong",
      href: "https://github.com/tranhienchuong",
    },
  },
  capabilities: [
    {
      number: "01",
      title: "Grounded AI systems",
      description:
        "Design RAG and agentic flows around bounded knowledge, citations, scope control, and observable failure modes.",
      tools: ["LLMs", "RAG", "GraphRAG", "Agents"],
    },
    {
      number: "02",
      title: "Evaluation before polish",
      description:
        "Build benchmarks and ablations to learn where a system wins, where it fails, and whether added complexity earns its place.",
      tools: ["Recall@K", "Test sets", "Ablations", "Failure analysis"],
    },
    {
      number: "03",
      title: "End-to-end prototypes",
      description:
        "Connect model logic to usable interfaces and deployment infrastructure so an idea can be tested by real people.",
      tools: ["Python", "FastAPI", "React", "Vector databases"],
    },
  ],
  notes: [
    {
      label: "Retrieval note",
      title: "When GraphRAG helps—and what it adds",
      summary:
        "A practical look at the recall gain, orchestration cost, and evaluation work behind a graph-assisted retrieval path.",
    },
    {
      label: "Safety note",
      title: "Refusing outside a bounded legal corpus",
      summary:
        "Why a trustworthy assistant needs scope detection and citation checks as first-class product behavior.",
    },
    {
      label: "RL note",
      title: "The useful result was not a win",
      summary:
        "A traffic-control experiment where fixed-time baselines remained strong—and why that made the evaluation more valuable.",
    },
  ],
  projects: [
    {
      slug: "labor-law-ai",
      eyebrow: "Flagship · Solo project",
      title: "Vietnamese Labor Law AI Assistant",
      summary:
        "A citation-grounded assistant for a bounded Vietnamese labor-law corpus, with hybrid retrieval, optional graph expansion, scope control, and an evaluation harness.",
      role: "Product, AI engineering, evaluation, and full-stack implementation",
      ownership: "Designed and built independently from research question to deployed beta.",
      problem:
        "Legal answers can sound plausible while being unsupported. The core problem was not simply generation—it was helping a user trace each answer back to a limited, inspectable source corpus.",
      approach: [
        "Chunked and indexed a six-document corpus for hybrid retrieval in Qdrant.",
        "Added optional Neo4j graph expansion to recover related legal context.",
        "Validated citations and refused questions that fell outside the indexed scope.",
        "Built a 100-query benchmark and regression tests before tuning the interface.",
      ],
      outcome:
        "The graph-assisted path improved Recall@10 by 10 percentage points on the benchmark while keeping citation and out-of-scope checks explicit. The result is a research-grade beta, not a substitute for legal advice.",
      metrics: [
        { value: "83.5%", label: "Recall@10", detail: "up from 73.5%" },
        { value: "100", label: "benchmark queries" },
        { value: "1,556", label: "indexed chunks" },
        { value: "32", label: "test modules" },
      ],
      stack: ["Python", "FastAPI", "Qdrant", "Neo4j", "React", "TypeScript", "Supabase"],
      repository:
        "https://github.com/tranhienchuong/vietnamese-labor-law-ai-assistant",
      live: "https://www.trolyluatlaodong.live/",
      cover: {
        src: "https://raw.githubusercontent.com/tranhienchuong/vietnamese-labor-law-ai-assistant/main/assets/in-corpus.png",
        alt: "Vietnamese Labor Law AI Assistant showing a cited in-corpus answer",
      },
      gallery: [
        {
          src: "https://raw.githubusercontent.com/tranhienchuong/vietnamese-labor-law-ai-assistant/main/assets/rag-pipeline.png",
          alt: "Retrieval-augmented generation pipeline diagram",
        },
        {
          src: "https://raw.githubusercontent.com/tranhienchuong/vietnamese-labor-law-ai-assistant/main/assets/out-corpus.png",
          alt: "Assistant refusing a question outside the bounded corpus",
        },
      ],
      nextSteps: [
        "Expand evaluation beyond retrieval recall to groundedness and answer utility.",
        "Run adversarial tests against citation mismatch and ambiguous user intent.",
        "Improve observability around graph expansion and retrieval latency.",
      ],
    },
    {
      slug: "traffic-rl",
      eyebrow: "Research · Group project",
      title: "Multi-Agent Traffic Signal Control",
      summary:
        "A SUMO traffic-control study comparing a shared Dueling Double DQN policy with fixed-time and heuristic baselines across nine intersections.",
      role: "Environment design, RL formulation, model, and training pipeline",
      ownership:
        "Contributed from project framing through evaluation, with direct ownership of the SUMO environment and traffic scenarios, state/action/reward design, Dueling Double DQN, and training pipeline.",
      problem:
        "Can a shared learning policy coordinate a nine-intersection network well enough to outperform simpler signal plans—and under which traffic conditions does the added complexity pay off?",
      approach: [
        "Built SUMO traffic scenarios and connected the simulator to the learning loop.",
        "Defined the state, discrete phase actions, and reward signal for shared control.",
        "Implemented a shared multi-agent Dueling Double DQN training pipeline.",
        "Compared policies across ten random seeds and multiple demand levels.",
      ],
      outcome:
        "The learned policy was competitive under high demand, but fixed-time control remained strong at low and medium demand. That negative result sharpened the conclusion: RL should be justified against solid baselines, not assumed superior.",
      metrics: [
        { value: "9", label: "intersections" },
        { value: "10", label: "evaluation seeds" },
        { value: "3", label: "demand levels" },
        { value: "1", label: "shared policy" },
      ],
      stack: ["Python", "SUMO", "TraCI", "PyTorch", "Dueling DDQN", "Multi-agent RL"],
      repository: "https://github.com/buitheanh874/GroupProject",
      cover: {
        src: "https://raw.githubusercontent.com/buitheanh874/GroupProject/main/artifacts/SUMO%20Map.png",
        alt: "SUMO road network with nine signalized intersections",
      },
      gallery: [
        {
          src: "https://raw.githubusercontent.com/buitheanh874/GroupProject/main/artifacts/Core%20Control%20System%20Pipeline.png",
          alt: "Traffic-control system pipeline",
        },
        {
          src: "https://raw.githubusercontent.com/buitheanh874/GroupProject/main/artifacts/eval_1000_metrics.png",
          alt: "Traffic policy evaluation metrics",
        },
      ],
      nextSteps: [
        "Test more realistic demand shifts and partial observability.",
        "Compare independent and shared policies under the same budget.",
        "Report confidence intervals and compute cost alongside traffic metrics.",
      ],
    },
  ],
} satisfies PortfolioContent
