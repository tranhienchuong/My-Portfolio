import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/lib/portfolio";

export function Skills() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="skills">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <FadeUp>
          <SectionHeading
            eyebrow="Capabilities"
            title="Frontend skills for clean, scalable interfaces."
          />
        </FadeUp>
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <FadeUp key={skill}>
              <GlassCard className="px-4 py-3 text-sm font-medium text-foreground" interactive>
                {skill}
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
