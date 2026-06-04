import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { type Project, projects } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

function ProjectVisual({ type }: { type: Project["visualType"] }) {
  if (type === "legal-ai") {
    return (
      <div className="relative min-h-64 overflow-hidden rounded-lg border border-neon-cyan/20 bg-background/50 p-5">
        <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-neon-purple/25 bg-neon-purple/10 blur-xl" />
        <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div
                className="rounded-md border border-white/10 bg-white/[0.055] p-3"
                key={item}
              >
                <div className="mb-3 h-2 w-24 rounded-full bg-neon-cyan/50" />
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-white/20" />
                  <div className="h-2 w-4/5 rounded-full bg-white/15" />
                  <div className="h-2 w-2/3 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
          <div className="relative min-h-52">
            <div className="absolute left-8 top-8 h-3 w-24 rotate-12 rounded-full bg-neon-cyan/30" />
            <div className="absolute left-20 top-24 h-3 w-28 -rotate-12 rounded-full bg-neon-purple/35" />
            <div className="absolute right-10 top-16 h-3 w-20 rotate-45 rounded-full bg-neon-cyan/25" />
            {[
              "left-4 top-4 border-neon-cyan/50",
              "right-8 top-10 border-neon-purple/50",
              "left-20 top-28 border-neon-pink/45",
              "right-2 bottom-8 border-neon-cyan/40",
            ].map((classes) => (
              <div
                className={cn(
                  "absolute h-14 w-14 rounded-full border bg-white/[0.055] shadow-glow backdrop-blur",
                  classes,
                )}
                key={classes}
              >
                <div className="mx-auto mt-5 h-2 w-6 rounded-full bg-white/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-lg border border-neon-pink/20 bg-background/50 p-5">
        <div className="absolute inset-x-8 top-10 h-28 rounded-full bg-neon-pink/15 blur-3xl" />
        <div className="relative h-56 w-32 rounded-[1.75rem] border border-white/15 bg-black p-2 shadow-pink-glow">
          <div className="h-full rounded-[1.25rem] border border-white/10 bg-gradient-to-b from-neon-purple/20 to-neon-pink/10 p-3">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/30" />
            <div className="relative h-36">
              <div className="absolute left-1/2 top-2 h-10 w-10 -translate-x-1/2 rounded-full border border-neon-pink/60 bg-white/[0.06]" />
              <div className="absolute left-5 top-20 h-px w-20 bg-neon-purple/50" />
              <div className="absolute left-4 top-16 h-8 w-8 rounded-full border border-neon-purple/60 bg-white/[0.06]" />
              <div className="absolute right-4 top-16 h-8 w-8 rounded-full border border-neon-purple/60 bg-white/[0.06]" />
              <div className="absolute bottom-2 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border border-neon-cyan/50 bg-white/[0.06]" />
              <div className="absolute left-1/2 top-12 h-16 w-px -translate-x-1/2 bg-neon-pink/45" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-40 grid-cols-3 gap-3 rounded-lg border border-white/10 bg-background/50 p-4">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div
          className="rounded-md border border-white/10 bg-white/[0.055] p-3"
          key={item}
        >
          <div className="mb-3 h-2 w-10 rounded-full bg-neon-cyan/50" />
          <div className="h-12 rounded bg-gradient-to-br from-neon-purple/25 to-neon-pink/15" />
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isPrimary = index === 0;
  const isSecondary = index === 1;
  const hasExternalLink = project.href && project.href !== "#";

  return (
    <FadeUp
      className={cn(
        isPrimary && "lg:col-span-12",
        isSecondary && "lg:col-span-6",
        index > 1 && "lg:col-span-3",
      )}
    >
      <GlassCard
        className={cn(
          "h-full p-5 sm:p-6",
          isPrimary && "lg:p-7",
          isSecondary && "border-neon-pink/20",
        )}
        interactive
      >
        <article
          className={cn(
            "grid h-full gap-6",
            isPrimary && "lg:grid-cols-[1.05fr_0.95fr] lg:items-center",
          )}
        >
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
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
              {project.category}
            </p>
            <h3
              className={cn(
                "mt-3 font-semibold leading-tight text-foreground",
                isPrimary ? "text-3xl sm:text-4xl" : "text-2xl",
              )}
            >
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {project.longDescription ?? project.description}
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {project.highlights.slice(0, isPrimary ? 6 : 4).map((highlight) => (
                <li className="flex gap-2" key={highlight}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-pink" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            {hasExternalLink ? (
              <a
                aria-label={`View ${project.title} on GitHub`}
                className="mt-6 inline-flex rounded-md border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition-colors hover:border-neon-cyan/70 hover:bg-neon-cyan/15 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                href={project.href}
                rel="noreferrer"
                target="_blank"
              >
                View on GitHub
              </a>
            ) : null}
          </div>
          {(isPrimary || isSecondary) && <ProjectVisual type={project.visualType} />}
        </article>
      </GlassCard>
    </FadeUp>
  );
}

export function Projects() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="work">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="Projects & Experiments"
            title="Real projects, research builds, and visual experiments."
            description="A mix of real projects, research work, mobile prototypes, and UI experiments - built to explore AI, frontend systems, interaction design, and polished digital experiences."
          />
        </FadeUp>
        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard index={index} key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
