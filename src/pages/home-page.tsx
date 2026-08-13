import {
  ArrowRight,
  Braces,
  Code2,
  Database,
  ExternalLink,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { portfolioContent, type PortfolioProject } from "@/portfolio/content"

const projectTones = [
  { icon: "bg-accent", panel: "bg-secondary" },
  { icon: "bg-note", panel: "bg-note" },
]

function SystemPreview() {
  const steps = [
    { number: "01", label: "Retrieve", detail: "hybrid search", tone: "bg-secondary" },
    { number: "02", label: "Expand", detail: "graph context", tone: "bg-note" },
    { number: "03", label: "Verify", detail: "citation check", tone: "bg-accent" },
  ]

  return (
    <div className="relative py-8 lg:py-4">
      <div className="clay-hover rounded-[1.5rem] border-2 border-border bg-surface p-5 shadow-neo-lg sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-control border-2 border-border bg-accent"><Braces aria-hidden="true" className="size-6" /></span>
            <div><p className="font-display text-lg font-semibold">Grounded answer pipeline</p><p className="text-sm text-muted-foreground">Evidence before output</p></div>
          </div>
          <Badge variant="success"><span className="size-1.5 rounded-full bg-current" /> evaluating</Badge>
        </div>

        <div className="mt-7 space-y-3">
          {steps.map((step) => (
            <div key={step.number} className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-control border-2 border-border bg-background p-3">
              <span className={`grid size-10 place-items-center rounded-lg border-2 border-border font-display text-sm font-semibold ${step.tone}`}>{step.number}</span>
              <div><p className="font-display font-semibold">{step.label}</p><p className="text-xs text-muted-foreground">{step.detail}</p></div>
              <span className="font-mono text-xs text-primary-strong">pass</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Benchmark Recall@10</span><strong className="font-display">83.5%</strong></div>
          <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-border bg-muted"><div className="h-full w-[83.5%] bg-primary" /></div>
        </div>
      </div>

      <span className="absolute -left-3 bottom-14 grid size-14 rotate-[-5deg] place-items-center rounded-control border-2 border-border bg-note shadow-neo-sm sm:-left-5"><Database aria-hidden="true" className="size-6" /></span>
      <span className="absolute -right-2 top-0 grid size-14 rotate-[5deg] place-items-center rounded-control border-2 border-border bg-accent shadow-neo-sm sm:-right-4"><ShieldCheck aria-hidden="true" className="size-6" /></span>
      <span className="absolute -right-3 bottom-20 grid size-11 place-items-center rounded-full border-2 border-border bg-primary shadow-neo-sm"><Sparkles aria-hidden="true" className="size-5" /></span>
    </div>
  )
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const tone = projectTones[index]

  return (
    <article className="clay-hover grid overflow-hidden rounded-[1.5rem] border-2 border-border bg-surface shadow-neo-lg lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <span className={`grid size-14 place-items-center rounded-control border-2 border-border ${tone.icon}`}>
              {index === 0 ? <Search aria-hidden="true" className="size-6" /> : <Sparkles aria-hidden="true" className="size-6" />}
            </span>
            <Badge variant="outline">{project.eyebrow}</Badge>
          </div>
          <h3 className="mt-7 font-display text-3xl font-semibold leading-tight text-heading sm:text-4xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{project.summary}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-border-subtle py-4">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label}><p className="font-display text-xl font-semibold">{metric.value}</p><p className="mt-1 text-xs text-muted-foreground">{metric.label}</p></div>
            ))}
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild><Link to={`/work/${project.slug}`}>Read case study <ArrowRight /></Link></Button>
          <Button asChild variant="ghost"><a href={project.repository} target="_blank" rel="noreferrer">Code <ExternalLink /></a></Button>
        </div>
      </div>
      <div className={`border-t-2 border-border p-5 lg:border-l-2 lg:border-t-0 ${tone.panel}`}>
        <div className="flex h-full min-h-72 items-center justify-center rounded-[1.1rem] border-2 border-border bg-surface p-3">
          <img src={project.cover.src} alt={project.cover.alt} loading="lazy" className="max-h-[22rem] w-full rounded-lg object-contain" />
        </div>
      </div>
    </article>
  )
}

export function HomePage() {
  const [flagship] = portfolioContent.projects
  const stats = flagship.metrics.slice(0, 3)

  return (
    <main>
      <section className="bg-background">
        <div className="content-shell grid gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div>
            <Badge variant="primary"><span className="size-2 rounded-full bg-foreground" /> {portfolioContent.person.availability}</Badge>
            <h1 className="mt-7 max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.08] tracking-[-0.025em] text-heading sm:text-6xl lg:text-[4.35rem]">
              I build AI systems that <span className="text-primary">stay grounded.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{portfolioContent.person.introduction}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg"><a href="#work">Explore my work <ArrowRight /></a></Button>
              <Button asChild size="lg" variant="secondary"><Link to="/resume">View résumé</Link></Button>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 sm:gap-8">
              {stats.map((metric) => (
                <div key={metric.label}><p className="font-display text-2xl font-semibold text-heading sm:text-3xl">{metric.value}</p><p className="text-xs text-muted-foreground sm:text-sm">{metric.label}</p></div>
              ))}
            </div>
          </div>
          <SystemPreview />
        </div>
      </section>

      <section id="work" className="scroll-mt-28 bg-surface py-20 sm:py-24">
        <div className="content-shell">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary">Selected work</Badge>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-heading sm:text-5xl">AI projects built around real questions</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">From trustworthy legal retrieval to multi-agent traffic control—each project starts with a claim and ends with evidence.</p>
          </div>
          <div className="mt-12 space-y-8">
            {portfolioContent.projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-28 bg-background py-20 sm:py-24">
        <div className="content-shell">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent">How I work</Badge>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-heading sm:text-5xl">Everything needed to test an AI idea</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {portfolioContent.capabilities.map((capability, index) => {
              const Icon = [Database, ShieldCheck, Code2][index]
              const color = ["bg-accent", "bg-secondary", "bg-note"][index]
              return (
                <article key={capability.number} className="soft-clay-hover rounded-[1.5rem] bg-surface p-7 text-center shadow-lg">
                  <span className={`mx-auto grid size-16 place-items-center rounded-control border-2 border-border ${color}`}><Icon aria-hidden="true" className="size-7" /></span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-heading">{capability.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{capability.description}</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">{capability.tools.map((tool) => <Badge key={tool} variant="outline">{tool}</Badge>)}</div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="notes" className="scroll-mt-28 bg-surface py-20 sm:py-24">
        <div className="content-shell">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="primary">AI Lab Notes</Badge>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-heading sm:text-5xl">What the experiments taught me</h2>
            <p className="mt-4 text-lg text-muted-foreground">Short observations from the parts that resisted the demo.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {portfolioContent.notes.map((note, index) => (
              <article key={note.title} className="clay-hover rounded-[1.5rem] border-2 border-border bg-surface p-7 shadow-neo-lg">
                <span className={`grid size-11 place-items-center rounded-control border-2 border-border ${["bg-secondary", "bg-accent", "bg-note"][index]}`}><span className="font-display font-semibold">0{index + 1}</span></span>
                <p className="mt-7 text-sm font-medium text-primary-strong">{note.label}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-heading">{note.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{note.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 bg-background py-20 sm:py-24">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[1.5rem] border-2 border-border bg-accent" aria-hidden="true" />
            <div className="relative flex aspect-square flex-col justify-between rounded-[1.5rem] border-2 border-border bg-surface p-8 shadow-neo-lg">
              <div className="flex items-center justify-between"><Badge variant="secondary">Applied AI / 2026</Badge><Sparkles className="size-7 text-primary" /></div>
              <p className="font-display text-8xl font-semibold leading-none tracking-[-0.06em] text-heading sm:text-9xl">HC</p>
              <p className="font-display text-xl font-medium text-heading">Creative · Curious · Polished</p>
            </div>
          </div>
          <div>
            <Badge variant="accent">A little about me</Badge>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight text-heading sm:text-5xl">Curious enough to explore. Careful enough to measure.</h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>I’m a new graduate building toward an Applied AI Engineering role. I’m most interested in systems where model quality depends on retrieval, evaluation, and product judgment—not just a prompt.</p>
              <p>My projects begin with a question I cannot answer from intuition alone. I build the smallest useful system, compare it with a baseline, and keep the result even when it is less impressive than expected.</p>
            </div>
            <div className="mt-8"><Button asChild variant="secondary"><Link to="/resume">Read my résumé <ArrowRight /></Link></Button></div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 bg-secondary py-20 sm:py-24">
        <div className="content-shell">
          <div className="clay-hover mx-auto max-w-4xl rounded-[1.5rem] border-2 border-border bg-surface px-6 py-12 text-center shadow-neo-lg sm:px-12">
            <Badge variant="primary">Let’s build something useful</Badge>
            <h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-4xl font-semibold text-heading sm:text-5xl">Looking for an Applied AI engineer who asks the next question?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">I’m looking for a team that values careful evaluation, clear trade-offs, and shipping systems people can actually use.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button asChild size="lg"><a href={portfolioContent.links.email.href}><Mail /> Gmail</a></Button>
              <Button asChild size="lg" variant="secondary"><a href={portfolioContent.links.phone.href}><Phone /> Call me</a></Button>
              <Button asChild size="lg" variant="outline"><a href={portfolioContent.links.facebook.href} target="_blank" rel="noreferrer">Facebook <ExternalLink /></a></Button>
              <Button asChild size="lg" variant="outline"><a href={portfolioContent.links.github.href} target="_blank" rel="noreferrer">GitHub <ExternalLink /></a></Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{portfolioContent.links.email.display} · {portfolioContent.links.phone.display}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
