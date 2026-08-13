import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"

import { MetricCard } from "@/components/portfolio/metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { portfolioContent } from "@/portfolio/content"

const metricTones = ["primary", "secondary", "accent", "note"] as const

export function ProjectPage() {
  const { slug } = useParams()
  const project = portfolioContent.projects.find((candidate) => candidate.slug === slug)

  if (!project) return <Navigate to="/404" replace />

  const currentIndex = portfolioContent.projects.indexOf(project)
  const nextProject = portfolioContent.projects[(currentIndex + 1) % portfolioContent.projects.length]

  return (
    <main>
      <section className="content-shell py-12 sm:py-16 lg:py-20">
        <Link to="/#work" className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold underline-offset-4 hover:underline">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to selected work
        </Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Badge variant={project.slug === "labor-law-ai" ? "primary" : "note"}>{project.eyebrow}</Badge>
            <h1 className="mt-6 max-w-5xl text-balance font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">{project.title}</h1>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.live ? <Button asChild><a href={project.live} target="_blank" rel="noreferrer">Open live beta <ExternalLink /></a></Button> : null}
              <Button asChild variant="outline"><a href={project.repository} target="_blank" rel="noreferrer">View repository <ExternalLink /></a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-border bg-surface py-8" aria-label="Project metrics">
        <div className="content-shell grid grid-cols-2 gap-4 lg:grid-cols-4">
          {project.metrics.map((metric, index) => <MetricCard key={metric.label} value={metric.value} label={metric.label} note={"detail" in metric ? metric.detail : undefined} tone={metricTones[index]} />)}
        </div>
      </section>

      <section className="content-shell py-16 sm:py-24">
        <div className="overflow-hidden rounded-surface border-2 border-border bg-secondary p-4 shadow-neo sm:p-8">
          <img src={project.cover.src} alt={project.cover.alt} className="mx-auto max-h-[42rem] w-full rounded-control border-2 border-border bg-surface object-contain" />
        </div>
      </section>

      <section className="border-y-2 border-border bg-note py-16 sm:py-24">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">01 / Problem</p>
            <h2 className="mt-3 font-display text-4xl font-bold">The question behind the build</h2>
          </div>
          <p className="text-xl leading-relaxed text-foreground/75 sm:text-2xl">{project.problem}</p>
        </div>
      </section>

      <section className="content-shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">02 / Ownership</p>
          <h2 className="mt-3 font-display text-4xl font-bold">What I worked on</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground"><strong className="text-foreground">Role:</strong> {project.role}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{project.ownership}</p>
        </div>
        <ol className="divide-y-2 divide-border border-y-2 border-border">
          {project.approach.map((step, index) => (
            <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <p className="text-lg leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y-2 border-border bg-secondary py-16 text-foreground sm:py-24">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong">03 / Result</p>
            <h2 className="mt-3 font-display text-4xl font-bold">What the evidence said</h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-foreground/75 sm:text-2xl">{project.outcome}</p>
            <div className="mt-8 flex flex-wrap gap-2">{project.stack.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}</div>
          </div>
        </div>
      </section>

      <section className="content-shell py-16 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {project.gallery.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-surface border-2 border-border bg-surface p-3 shadow-neo-sm">
              <img src={image.src} alt={image.alt} loading="lazy" className="aspect-[16/10] w-full rounded-control border-2 border-border-subtle object-contain" />
              <figcaption className="px-2 pb-1 pt-4 text-sm text-muted-foreground">{image.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-border bg-accent py-16 sm:py-20">
        <div className="content-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">04 / Next iteration</p>
            <h2 className="mt-3 font-display text-4xl font-bold">What I would improve next</h2>
          </div>
          <ul className="space-y-4">
            {project.nextSteps.map((step) => <li key={step} className="flex gap-3 text-lg leading-relaxed"><Check aria-hidden="true" className="mt-1 size-5 shrink-0" /> {step}</li>)}
          </ul>
        </div>
      </section>

      <section className="content-shell py-16 sm:py-20">
        <Link to={`/work/${nextProject.slug}`} className="clay-hover grid gap-6 rounded-surface border-2 border-border bg-primary p-6 shadow-neo-lg sm:grid-cols-[1fr_auto] sm:items-end sm:p-10">
          <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">Next case study</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{nextProject.title}</h2></div>
          <span className="inline-flex items-center gap-2 font-display font-semibold">Read next <ArrowRight aria-hidden="true" /></span>
        </Link>
      </section>
    </main>
  )
}
