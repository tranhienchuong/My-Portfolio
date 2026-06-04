"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.from("[data-process-step]", {
        autoAlpha: 0,
        x: -24,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 45%",
            scrub: 0.5,
          },
        },
      );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, [reduceMotion]);

  return (
    <section className="border-t border-white/10 py-16 sm:py-20" id="process" ref={sectionRef}>
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Process"
          title="A simple path from idea to polished interface."
          description="The workflow stays practical so visual experiments still become usable frontend work."
        />
        <div className="relative space-y-5 pl-6">
          <div className="absolute bottom-3 left-0 top-3 w-px origin-top bg-neon-cyan/70" ref={lineRef} />
          {processSteps.map((step, index) => (
            <GlassCard className="p-6" data-process-step interactive key={step.title}>
              <p className="text-sm font-semibold text-neon-cyan">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
