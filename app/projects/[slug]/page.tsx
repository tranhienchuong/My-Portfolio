import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { getProjectBySlug, getProjectSlugs, type Project } from "@/lib/portfolio";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function DetailVisual({ type }: { type: Project["visualType"] }) {
  if (type === "legal-ai") {
    return (
      <div className="relative min-h-60 overflow-hidden rounded-lg border border-neon-cyan/20 bg-background/60 p-4 sm:min-h-72 sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,theme(colors.neon.cyan/0.16),transparent_18rem),radial-gradient(circle_at_80%_70%,theme(colors.neon.purple/0.15),transparent_20rem)]" />
        <div className="relative grid gap-5 md:grid-cols-[1fr_0.85fr]">
          <div className="space-y-3">
            {["Retrieved context", "Graph relation", "Citation check"].map((label) => (
              <div className="rounded-md border border-white/10 bg-white/[0.055] p-4" key={label}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neon-cyan">
                  {label}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="h-2 rounded-full bg-white/25" />
                  <div className="h-2 w-5/6 rounded-full bg-white/15" />
                  <div className="h-2 w-2/3 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
          <div className="relative min-h-44 sm:min-h-56">
            <div className="absolute left-10 top-12 h-2 w-28 rotate-12 rounded-full bg-neon-cyan/35" />
            <div className="absolute left-24 top-28 h-2 w-32 -rotate-12 rounded-full bg-neon-purple/35" />
            {[
              "left-4 top-4 border-neon-cyan/60",
              "right-8 top-12 border-neon-purple/60",
              "left-24 bottom-10 border-neon-pink/50",
            ].map((classes) => (
              <div
                className={`absolute h-16 w-16 rounded-full border bg-white/[0.06] shadow-glow backdrop-blur ${classes}`}
                key={classes}
              >
                <div className="mx-auto mt-6 h-2 w-7 rounded-full bg-white/55" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="relative flex min-h-60 items-center justify-center overflow-hidden rounded-lg border border-neon-pink/20 bg-background/60 p-4 sm:min-h-72 sm:p-5">
        <div className="absolute inset-x-8 top-10 h-32 rounded-full bg-neon-pink/15 blur-3xl" />
        <div className="relative h-60 w-36 rounded-[1.75rem] border border-white/15 bg-black p-2 shadow-pink-glow">
          <div className="h-full rounded-[1.25rem] border border-white/10 bg-gradient-to-b from-neon-purple/20 to-neon-pink/10 p-3">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/30" />
            <div className="relative h-40">
              <div className="absolute left-1/2 top-2 h-10 w-10 -translate-x-1/2 rounded-full border border-neon-pink/60 bg-white/[0.06]" />
              <div className="absolute left-5 top-20 h-px w-24 bg-neon-purple/50" />
              <div className="absolute left-3 top-16 h-8 w-8 rounded-full border border-neon-purple/60 bg-white/[0.06]" />
              <div className="absolute right-3 top-16 h-8 w-8 rounded-full border border-neon-purple/60 bg-white/[0.06]" />
              <div className="absolute bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border border-neon-cyan/50 bg-white/[0.06]" />
              <div className="absolute left-1/2 top-12 h-20 w-px -translate-x-1/2 bg-neon-pink/45" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-60 grid-cols-2 gap-3 rounded-lg border border-white/10 bg-background/60 p-4 sm:min-h-72 sm:grid-cols-3 sm:p-5">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div className="rounded-md border border-white/10 bg-white/[0.055] p-3" key={item}>
          <div className="mb-3 h-2 w-10 rounded-full bg-neon-cyan/50" />
          <div className="h-16 rounded bg-gradient-to-br from-neon-purple/25 to-neon-pink/15" />
        </div>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | Project Detail`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasExternalLink = project.href && project.href !== "#";
  const overview = [
    { title: "Problem", text: project.problem },
    { title: "Solution", text: project.solution },
    { title: "Outcome / What this demonstrates", text: project.outcome },
  ];

  return (
    <div className="border-t border-white/10 py-12 sm:py-16">
      <Container>
        <Link
          aria-label="Back to homepage projects section"
          className="inline-flex text-sm font-semibold text-neon-cyan transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
          href="/#work"
        >
          Back to projects
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              {[project.type, project.status].map((item) => (
                <span
                  className="rounded-md border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
              {project.category}
            </p>
            <h1 className="mt-4 max-w-4xl break-words text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
              {project.longDescription ?? project.description}
            </p>
            {hasExternalLink ? (
              <a
                aria-label={`View ${project.title} on GitHub`}
                className="mt-7 inline-flex rounded-md border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition-colors hover:border-neon-cyan/70 hover:bg-neon-cyan/15 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                href={project.href}
                rel="noreferrer"
                target="_blank"
              >
                View on GitHub
              </a>
            ) : null}
          </div>
          <GlassCard className="p-3">
            <DetailVisual type={project.visualType} />
          </GlassCard>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {overview.map((item) => (
            <GlassCard className="p-6" key={item.title}>
              <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </GlassCard>
          ))}
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Highlights</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div
                  className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-muted-foreground"
                  key={highlight}
                >
                  {highlight}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Tech stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </section>

        {project.note ? (
          <GlassCard className="mt-5 p-5">
            <p className="text-sm leading-6 text-muted-foreground">{project.note}</p>
          </GlassCard>
        ) : null}
      </Container>
    </div>
  );
}
