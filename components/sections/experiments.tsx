import { FlickerText } from "@/components/effects/FlickerText";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { experiments } from "@/lib/portfolio";

export function Experiments() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="experiments">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <FadeUp>
            <SectionHeading
              eyebrow="UI experiments"
              title="Small studies for sharper frontend craft."
              description="Honest practice pieces focused on colorful UI, responsive layout, and component thinking."
            />
          </FadeUp>
          <div className="grid gap-5 md:grid-cols-2">
            {experiments.map((experiment) => (
              <FadeUp className="h-full" key={experiment.title}>
                <GlassCard className="h-full p-6" interactive>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-pink">
                    <FlickerText>{experiment.label}</FlickerText>
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">
                    {experiment.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {experiment.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {experiment.tags.map((tag) => (
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
        </div>
      </Container>
    </section>
  );
}
