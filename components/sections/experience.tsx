import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/portfolio";

export function Experience() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="experience">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="Build log"
            title="Independent practice without inflated claims."
            description="A transparent timeline of personal builds, coursework, self-directed practice, and experiments."
          />
        </FadeUp>
        <div className="mt-10 space-y-5">
          {experience.map((item) => (
            <FadeUp key={`${item.company}-${item.period}`}>
              <GlassCard className="p-6" interactive>
                <article className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">{item.role}</h3>
                    <p className="text-sm text-neon-cyan">{item.company}</p>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </article>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
