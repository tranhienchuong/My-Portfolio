import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Experiments } from "@/components/sections/experiments";
import { FeaturedCaseStudy } from "@/components/sections/featured-case-study";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <FeaturedCaseStudy />
      <Skills />
      <Experiments />
      <Process />
      <Experience />
      <Contact />
    </>
  );
}
