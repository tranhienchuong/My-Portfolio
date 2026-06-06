import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/portfolio";

export function Process() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="process">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <FadeUp>
          <SectionHeading
            eyebrow="Process"
            title="A simple path from idea to polished interface."
            description="The workflow stays practical so visual experiments still become usable frontend work."
          />
        </FadeUp>
        <div className="relative space-y-5 pl-6">
          <div className="absolute bottom-3 left-0 top-3 w-px origin-top bg-neon-cyan/70" />
          {processSteps.map((step, index) => (
            <FadeUp key={step.title}>
              <GlassCard className="p-6" interactive>
                <p className="text-sm font-semibold text-neon-cyan">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
