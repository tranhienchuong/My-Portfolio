import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { profile } from "@/lib/portfolio";

export function Contact() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="contact">
      <Container>
        <FadeUp>
          <GlassCard className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neon-cyan">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                <GradientText>Let&apos;s build a useful web experience.</GradientText>
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Reach out for frontend projects, portfolio feedback, or collaboration.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <GlowButton href={`mailto:${profile.email}`}>Email me</GlowButton>
              {profile.socials.map((item) => (
                <GlowButton href={item.href} key={item.label} variant="secondary">
                  {item.label}
                </GlowButton>
              ))}
            </div>
          </GlassCard>
        </FadeUp>
      </Container>
    </section>
  );
}
