import { ArrowLeft, ExternalLink, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { portfolioContent } from "@/portfolio/content"

export function ResumePage() {
  return (
    <main className="content-shell py-10 sm:py-14">
      <div className="resume-actions mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold hover:underline"><ArrowLeft className="size-4" /> Back home</Link>
        <Button onClick={() => window.print()}>Print / Save PDF</Button>
      </div>

      <article className="mx-auto max-w-5xl rounded-surface border-2 border-border bg-surface p-6 shadow-neo sm:p-10 lg:p-14">
        <header className="border-b-2 border-border pb-9">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Résumé / engineering profile</p>
            <h1 className="mt-3 font-display text-5xl font-bold tracking-[-0.04em]">{portfolioContent.person.name}</h1>
            <p className="mt-3 text-xl text-muted-foreground">{portfolioContent.person.role}</p>
          </div>
          <div className="mt-7 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            <a href={portfolioContent.links.email.href} className="inline-flex min-h-11 items-center gap-2 font-medium"><Mail className="size-4" /> {portfolioContent.links.email.display}</a>
            <a href={portfolioContent.links.phone.href} className="inline-flex min-h-11 items-center gap-2 font-medium"><Phone className="size-4" /> {portfolioContent.links.phone.display}</a>
            <a href={portfolioContent.links.facebook.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-medium">Facebook <ExternalLink className="size-4" /></a>
            <a href={portfolioContent.links.github.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-medium">GitHub <ExternalLink className="size-4" /></a>
          </div>
        </header>

        <section className="grid gap-6 border-b-2 border-border py-9 md:grid-cols-[12rem_1fr]">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Profile</h2>
          <p className="max-w-3xl text-lg leading-relaxed">{portfolioContent.person.introduction}</p>
        </section>

        <section className="grid gap-8 border-b-2 border-border py-9 md:grid-cols-[12rem_1fr]">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Selected projects</h2>
          <div className="space-y-10">
            {portfolioContent.projects.map((project) => (
              <article key={project.slug}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div><h3 className="font-display text-2xl font-bold">{project.title}</h3><p className="mt-1 text-sm font-semibold text-muted-foreground">{project.eyebrow}</p></div>
                  <a href={project.repository} target="_blank" rel="noreferrer" className="font-display text-sm font-semibold underline">Repository</a>
                </div>
                <p className="mt-4 leading-relaxed text-foreground/75">{project.outcome}</p>
                <p className="mt-3 text-sm leading-relaxed"><strong>Contribution:</strong> {project.role}.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{project.stack.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-9 md:grid-cols-[12rem_1fr]">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Capabilities</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {portfolioContent.capabilities.map((capability) => (
              <article key={capability.number}><h3 className="font-display text-lg font-bold">{capability.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capability.description}</p></article>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
