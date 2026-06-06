"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import profileImage from "@/image/profile.png";
import { FlickerText } from "@/components/effects/FlickerText";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { heroReveal, heroStagger } from "@/lib/motion";
import { heroIdentityPhrases, profile, stats } from "@/lib/portfolio";

const HERO_IDENTITY_INTERVAL_MS = 2600;

function RotatingIdentity({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || heroIdentityPhrases.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        (currentIndex + 1) % heroIdentityPhrases.length,
      );
    }, HERO_IDENTITY_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [reduceMotion]);

  const phrase = reduceMotion
    ? heroIdentityPhrases[0]
    : heroIdentityPhrases[activeIndex];

  if (reduceMotion) {
    return <span>{phrase}</span>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        animate={{ opacity: 1, y: 0 }}
        className="inline-block"
        exit={{ opacity: 0, y: -8 }}
        initial={{ opacity: 0, y: 8 }}
        key={phrase}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      >
        {phrase}
      </motion.span>
    </AnimatePresence>
  );
}

export function Hero() {
  const reduceMotion = Boolean(useReducedMotion());
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profile.email,
  )}&su=${encodeURIComponent("Portfolio collaboration")}`;

  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          variants={heroStagger}
          animate="visible"
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.24em] text-neon-cyan"
            variants={heroReveal}
          >
            <FlickerText>{profile.role}</FlickerText>
          </motion.p>
          <motion.h1
            className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.94] text-foreground sm:text-7xl lg:text-8xl"
            variants={heroReveal}
          >
            <GradientText className="hero-gradient-name">{profile.displayName}</GradientText>
          </motion.h1>
          <motion.div
            aria-label={`Personal lab identity: ${heroIdentityPhrases.join(", ")}`}
            className="mt-6 max-w-2xl rounded-lg border border-neon-cyan/20 bg-white/[0.045] p-3 shadow-[0_0_28px_hsl(var(--neon-cyan)/0.08),inset_0_1px_0_hsl(var(--foreground)/0.08)] backdrop-blur-sm sm:p-4"
            variants={heroReveal}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-neon-cyan">
                Personal Lab
              </span>
              <span
                aria-live="off"
                className="relative block min-h-7 overflow-hidden text-base font-black uppercase tracking-[0.16em] text-foreground sm:text-lg"
              >
                <RotatingIdentity reduceMotion={reduceMotion} />
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {["Create", "Build", "Ship", "Automate", "Own"].map((item) => (
                <span
                  className="rounded border border-white/10 bg-white/[0.04] px-2 py-1"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
            variants={heroReveal}
          >
            {profile.summary}
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" variants={heroReveal}>
            <GlowButton href="#work">Enter the lab</GlowButton>
            <GlowButton
              href={gmailComposeUrl}
              rel="noreferrer"
              target="_blank"
              variant="secondary"
            >
              Contact me
            </GlowButton>
          </motion.div>
          <motion.dl className="mt-12 grid gap-4 sm:grid-cols-3" variants={heroReveal}>
            {stats.map((stat) => (
              <GlassCard className="p-4 sm:p-5" interactive key={stat.label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-base font-semibold text-foreground">{stat.value}</dd>
              </GlassCard>
            ))}
          </motion.dl>
        </motion.div>
        <GlassCard
          className="mx-auto aspect-[4/5] w-full max-w-sm border-neon-pink/20 p-2 shadow-[0_20px_70px_hsl(260_90%_4%_/_0.36),0_0_34px_hsl(var(--neon-pink)/0.18)] lg:mr-0"
          interactive
        >
          <div className="relative h-full overflow-hidden rounded-md">
            <Image
              alt={`${profile.name} portrait`}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 90vw"
              src={profileImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-neon-cyan/10" />
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
