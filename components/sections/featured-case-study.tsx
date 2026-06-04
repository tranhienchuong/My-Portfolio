import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredCaseStudy } from "@/lib/portfolio";

function DocumentGraphVisual() {
  return (
    <div className="relative min-h-80 overflow-hidden rounded-lg border border-neon-cyan/20 bg-background/60 p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,theme(colors.neon.cyan/0.16),transparent_18rem),radial-gradient(circle_at_75%_70%,theme(colors.neon.purple/0.14),transparent_20rem)]" />
      <div className="relative grid gap-5 md:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3">
          {["Labor Code", "Decree", "Circular"].map((label, index) => (
            <div
              className="rounded-md border border-white/10 bg-white/[0.055] p-4"
              key={label}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neon-cyan">
                  {label}
                </span>
                <span className="rounded border border-neon-purple/25 bg-neon-purple/10 px-2 py-1 text-[10px] text-neon-purple">
                  C-{index + 1}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-white/25" />
                <div className="h-2 w-5/6 rounded-full bg-white/15" />
                <div className="h-2 w-2/3 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
        <div className="relative min-h-64">
          <div className="absolute left-8 top-14 h-2 w-28 rotate-12 rounded-full bg-neon-cyan/35" />
          <div className="absolute left-24 top-32 h-2 w-32 -rotate-12 rounded-full bg-neon-purple/35" />
          <div className="absolute right-12 top-20 h-2 w-24 rotate-45 rounded-full bg-neon-cyan/25" />
          {[
            "left-4 top-4 border-neon-cyan/60",
            "right-8 top-10 border-neon-purple/60",
            "left-24 top-32 border-neon-pink/50",
            "right-4 bottom-10 border-neon-cyan/45",
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

function ArchitectureFlow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {featuredCaseStudy.architecture.map((step, index) => (
        <div
          className="relative rounded-lg border border-white/10 bg-white/[0.045] p-4"
          key={step}
        >
          <span className="text-xs font-semibold text-neon-cyan">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 text-sm font-medium text-foreground">{step}</p>
          {index < featuredCaseStudy.architecture.length - 1 ? (
            <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-neon-purple/60 lg:block" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function FeaturedCaseStudy() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="case-study">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow={featuredCaseStudy.eyebrow}
            title={featuredCaseStudy.title}
            description={featuredCaseStudy.description}
          />
        </FadeUp>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeUp>
            <GlassCard className="h-full p-6 sm:p-7">
              <div className="grid gap-5">
                {[featuredCaseStudy.problem, featuredCaseStudy.solution].map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeUp>

          <FadeUp>
            <DocumentGraphVisual />
          </FadeUp>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeUp>
            <GlassCard className="p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                Architecture
              </p>
              <div className="mt-5">
                <ArchitectureFlow />
              </div>
            </GlassCard>
          </FadeUp>

          <FadeUp>
            <GlassCard className="p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                Key features
              </p>
              <div className="mt-5 grid gap-2">
                {featuredCaseStudy.features.map((feature) => (
                  <div
                    className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-muted-foreground"
                    key={feature}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeUp>
        </div>

        <FadeUp>
          <GlassCard className="mt-5 p-6 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                  Tech stack
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredCaseStudy.techStack.map((tag) => (
                    <span
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-neon-purple/20 bg-neon-purple/10 p-4 text-sm leading-6 text-muted-foreground">
                {featuredCaseStudy.note}
              </div>
            </div>
          </GlassCard>
        </FadeUp>
      </Container>
    </section>
  );
}
