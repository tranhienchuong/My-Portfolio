import Link from "next/link";
import { FlickerText } from "@/components/effects/FlickerText";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { type Project, projects } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

function ProjectVisual({ type }: { type: Project["visualType"] }) {
  if (type === "legal-ai") {
    return (
      <div className="relative min-h-56 overflow-hidden rounded-lg border border-neon-cyan/20 bg-background/50 p-4 sm:min-h-64 sm:p-5">
        <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-neon-purple/20 bg-neon-purple/10 opacity-70" />
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
          <div className="relative min-h-44 sm:min-h-52">
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
                  "absolute h-14 w-14 rounded-full border bg-white/[0.055] shadow-[0_0_18px_hsl(185_100%_58%_/_0.12)]",
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
      <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-lg border border-neon-pink/20 bg-background/50 p-4 sm:min-h-64 sm:p-5">
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
    <div className="grid min-h-40 grid-cols-2 gap-3 rounded-lg border border-white/10 bg-background/50 p-4 sm:grid-cols-3">
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
  const visibleHighlights = project.highlights.slice(
    0,
    isPrimary ? 3 : isSecondary ? 2 : 0,
  );
  const visibleTags = project.tags.slice(0, isPrimary ? 5 : isSecondary ? 4 : 3);
  const hiddenTagCount = project.tags.length - visibleTags.length;
  const tierLabel = isPrimary
    ? "Main Build"
    : isSecondary
      ? "Prototype / Product Experiment"
      : project.type;
  const shouldShowHighlights = visibleHighlights.length > 0;

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
          "group/project h-full p-5 transition-colors duration-200 hover:border-neon-cyan/45 hover:bg-white/[0.07] sm:p-6",
          isPrimary && "lg:p-7",
          isSecondary && "border-neon-pink/20",
        )}
        interactive={false}
        performance={isPrimary}
      >
        <article
          className={cn(
            "grid h-full gap-6",
            isPrimary && "lg:grid-cols-[1.05fr_0.95fr] lg:items-center",
          )}
        >
          <div>
            <div className="flex flex-wrap gap-2">
              {[tierLabel, project.status].map((item) => (
                <span
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-xs font-medium",
                    item === tierLabel
                      ? "border-neon-cyan/25 bg-neon-cyan/10 text-neon-cyan"
                      : "border-white/10 bg-white/[0.045] text-muted-foreground",
                  )}
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
              <FlickerText>{project.category}</FlickerText>
            </p>
            <h3
              className={cn(
                "mt-3 font-semibold leading-tight text-foreground transition-colors duration-200 group-hover/project:text-neon-cyan",
                isPrimary ? "text-3xl sm:text-4xl" : "text-2xl",
              )}
            >
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
            {shouldShowHighlights ? (
              <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {visibleHighlights.map((highlight) => (
                  <li className="flex gap-2" key={highlight}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-pink" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <span
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
              {hiddenTagCount > 0 ? (
                <span className="rounded-md border border-neon-cyan/15 bg-neon-cyan/10 px-2.5 py-1 text-xs text-neon-cyan">
                  +{hiddenTagCount} more
                </span>
              ) : null}
            </div>
            {hasExternalLink ? (
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  aria-label={`View details for ${project.title}`}
                  className="inline-flex rounded-none border border-neon-purple/30 bg-neon-purple/10 px-4 py-2 text-sm font-semibold text-neon-purple transition-colors [clip-path:polygon(0_0,calc(100%-9px)_0,100%_9px,100%_100%,9px_100%,0_calc(100%-9px))] hover:border-neon-purple/70 hover:bg-neon-purple/15 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-background"
                  href={`/projects/${project.slug}`}
                >
                  View details
                </Link>
                <a
                  aria-label={`View ${project.title} on GitHub`}
                  className="inline-flex rounded-none border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition-colors [clip-path:polygon(0_0,calc(100%-9px)_0,100%_9px,100%_100%,9px_100%,0_calc(100%-9px))] hover:border-neon-cyan/70 hover:bg-neon-cyan/15 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                  href={project.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  View on GitHub
                </a>
              </div>
            ) : null}
            {!hasExternalLink ? (
              <Link
                aria-label={`View details for ${project.title}`}
                className="mt-6 inline-flex rounded-none border border-neon-purple/30 bg-neon-purple/10 px-4 py-2 text-sm font-semibold text-neon-purple transition-colors [clip-path:polygon(0_0,calc(100%-9px)_0,100%_9px,100%_100%,9px_100%,0_calc(100%-9px))] hover:border-neon-purple/70 hover:bg-neon-purple/15 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-background"
                href={`/projects/${project.slug}`}
              >
                View details
              </Link>
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
            eyebrow="Selected builds"
            title="Tools, prototypes, research demos, and UI experiments."
            description="Start with the legal-tech research assistant and Android prototype, then scan smaller concepts and experiments built from curiosity, code, design, and AI tools."
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
