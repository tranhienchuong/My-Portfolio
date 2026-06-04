import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/lib/portfolio";

export function Projects() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="work">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="Selected work"
            title="Focused projects with clear structure and practical polish."
            description="A starting set of project cards that can be replaced with production case studies, live links, and richer outcomes."
          />
        </FadeUp>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <FadeUp key={project.title}>
              <GlassCard className="h-full p-6" interactive>
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
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
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
