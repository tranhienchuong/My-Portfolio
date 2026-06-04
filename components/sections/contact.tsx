import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { profile } from "@/lib/portfolio";

export function Contact() {
  const github = profile.socials.find((item) => item.label === "GitHub");

  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="contact">
      <Container>
        <FadeUp>
          <GlassCard className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neon-cyan">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                <GradientText>Let&apos;s create something visually memorable.</GradientText>
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Have an idea, opportunity, or collaboration in mind? Let&apos;s create
                something visually memorable.
              </p>
              <a
                className="mt-5 inline-flex text-sm font-semibold text-neon-cyan transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <GlowButton href={`mailto:${profile.email}`}>Start a conversation</GlowButton>
              {github ? (
                <GlowButton
                  aria-label={`Visit ${profile.name} on GitHub`}
                  href={github.href}
                  rel="noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  View GitHub
                </GlowButton>
              ) : null}
            </div>
          </GlassCard>
        </FadeUp>
      </Container>
    </section>
  );
}
