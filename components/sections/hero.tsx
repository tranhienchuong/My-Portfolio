"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import profileImage from "@/image/profile.png";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { heroReveal, heroStagger } from "@/lib/motion";
import { profile, stats } from "@/lib/portfolio";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          variants={heroStagger}
          animate="visible"
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.24em] text-neon-cyan"
            variants={heroReveal}
          >
            {profile.role}
          </motion.p>
          <motion.h1
            className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-6xl"
            variants={heroReveal}
          >
            <GradientText>{profile.name}</GradientText>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
            variants={heroReveal}
          >
            {profile.summary}
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" variants={heroReveal}>
            <GlowButton href="#work">View work</GlowButton>
            <GlowButton href={`mailto:${profile.email}`} variant="secondary">
              Get in touch
            </GlowButton>
          </motion.div>
          <motion.dl className="mt-12 grid gap-4 sm:grid-cols-3" variants={heroReveal}>
            {stats.map((stat) => (
              <GlassCard className="p-4" interactive key={stat.label}>
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 text-base font-medium text-foreground">{stat.value}</dd>
              </GlassCard>
            ))}
          </motion.dl>
        </motion.div>
        <GlassCard
          className="mx-auto aspect-[4/5] w-full max-w-sm p-2 shadow-pink-glow lg:mr-0"
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
