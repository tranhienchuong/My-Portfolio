"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { FlickerText } from "@/components/effects/FlickerText";
import { FadeUp } from "@/components/motion/fade-up";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { profile } from "@/lib/portfolio";

const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email,
)}&su=${encodeURIComponent("Portfolio collaboration")}`;

type CopyStatus = "idle" | "copied" | "failed";

export function Contact() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const copyTimerRef = useRef<number | null>(null);
  const contactSocials = profile.socials.filter((social) =>
    ["GitHub", "Facebook", "LinkedIn"].includes(social.label),
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    if (copyTimerRef.current) {
      window.clearTimeout(copyTimerRef.current);
    }

    copyTimerRef.current = window.setTimeout(() => {
      setCopyStatus("idle");
    }, 1800);
  }

  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="contact">
      <Container>
        <FadeUp>
          <GlassCard className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neon-cyan">
                <FlickerText>CONTACT</FlickerText>
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                <GradientText>Let&apos;s create something visually memorable.</GradientText>
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Have an idea, opportunity, or collaboration in mind? Send a note
                and I&apos;ll get back with a clear, practical next step.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/25 p-4 shadow-[0_18px_55px_hsl(260_90%_4%_/_0.38),0_0_34px_hsl(var(--neon-cyan)/0.08)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Direct inbox
              </p>
              <p className="mt-2 break-all text-sm font-semibold leading-6 text-foreground">
                {profile.email}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                <GlowButton
                  aria-label="Send an email via Gmail"
                  href={gmailComposeUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Send via Gmail
                </GlowButton>
                <button
                  aria-label="Copy email address"
                  aria-live="polite"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-white/12 bg-white/[0.055] px-5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-neon-cyan/50 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                  onClick={() => void copyEmail()}
                  type="button"
                >
                  {copyStatus === "copied"
                    ? "Copied"
                    : copyStatus === "failed"
                      ? "Copy failed"
                      : "Copy email"}
                </button>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Social
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {contactSocials.map((social) => (
                    <a
                      aria-label={`Visit ${profile.name} on ${social.label}`}
                      className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-neon-cyan/45 hover:bg-neon-cyan/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                      href={social.href}
                      key={social.label}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeUp>
      </Container>
    </section>
  );
}
