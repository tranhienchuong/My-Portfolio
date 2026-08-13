import { Code2, ExternalLink, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"

import { portfolioContent } from "@/portfolio/content"

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="content-shell grid gap-10 py-14 md:grid-cols-[1.4fr_0.6fr_0.6fr]">
        <div>
          <Link to="/" className="flex min-h-11 items-center gap-2.5 font-display text-xl font-semibold">
            <span className="grid size-10 place-items-center rounded-control border-2 border-border bg-accent"><Code2 aria-hidden="true" className="size-5" /></span>
            {portfolioContent.person.name}
          </Link>
          <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">Building grounded AI systems with careful evaluation and honest engineering trade-offs.</p>
        </div>
        <nav aria-label="Portfolio links">
          <p className="font-display font-semibold">Portfolio</p>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <Link to="/#work" className="flex min-h-11 items-center hover:text-foreground">Selected work</Link>
            <Link to="/#about" className="flex min-h-11 items-center hover:text-foreground">About me</Link>
            <Link to="/resume" className="flex min-h-11 items-center hover:text-foreground">Résumé</Link>
          </div>
        </nav>
        <nav aria-label="Social links">
          <p className="font-display font-semibold">Connect</p>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <a href={portfolioContent.links.email.href} className="inline-flex min-h-11 items-center gap-2 hover:text-foreground"><Mail aria-hidden="true" className="size-4" /> {portfolioContent.links.email.label}</a>
            <a href={portfolioContent.links.phone.href} className="inline-flex min-h-11 items-center gap-2 hover:text-foreground"><Phone aria-hidden="true" className="size-4" /> {portfolioContent.links.phone.display}</a>
            <a href={portfolioContent.links.facebook.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground">Facebook <ExternalLink aria-hidden="true" className="size-3.5" /></a>
            <a href={portfolioContent.links.github.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground">GitHub <ExternalLink aria-hidden="true" className="size-3.5" /></a>
          </div>
        </nav>
      </div>
      <div className="content-shell flex flex-wrap justify-between gap-3 border-t border-border-subtle py-5 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} {portfolioContent.person.name}</span>
        <span>Curious by default. Careful on purpose.</span>
      </div>
    </footer>
  )
}
