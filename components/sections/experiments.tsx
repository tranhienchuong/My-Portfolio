"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { experiments } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Experiments() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.from("[data-experiment-card]", {
        autoAlpha: 0,
        y: 34,
        scale: 0.98,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 35%",
          toggleActions: "play none none reverse",
        },
      });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=360",
            pin: "[data-experiments-pin]",
            pinSpacing: false,
          });
        },
      });
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, [reduceMotion]);

  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="experiments" ref={sectionRef}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div data-experiments-pin>
            <SectionHeading
              eyebrow="UI experiments"
              title="Small studies for sharper frontend craft."
              description="Honest practice pieces focused on colorful UI, responsive layout, and component thinking."
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {experiments.map((experiment) => (
              <GlassCard className="p-6" data-experiment-card interactive key={experiment.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-pink">
                  {experiment.label}
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
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
