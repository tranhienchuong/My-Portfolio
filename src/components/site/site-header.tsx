import { useState } from "react"
import { Code2, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { portfolioContent } from "@/portfolio/content"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-40 bg-background pt-4 sm:pt-5">
      <div className="clay-hover content-shell relative flex min-h-20 items-center justify-between gap-5 rounded-[1.5rem] border-2 border-border bg-surface px-4 shadow-neo-lg sm:px-6">
        <Link to="/" className="flex min-h-11 items-center gap-2.5 font-display text-lg font-semibold" aria-label={`${portfolioContent.person.name}, home`}>
          <span className="grid size-10 place-items-center rounded-control border-2 border-border bg-accent">
            <Code2 aria-hidden="true" className="size-5" />
          </span>
          <span>{portfolioContent.person.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex" aria-label="Primary navigation">
          {portfolioContent.navigation.map((item) => (
            <Link key={item.label} to={`/${item.href}`} className="flex min-h-11 items-center transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/resume" className="flex min-h-11 items-center text-sm font-medium text-muted-foreground hover:text-foreground">Résumé</Link>
          <Button asChild size="sm"><Link to="/#contact">Let’s talk</Link></Button>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-control border-2 border-border bg-surface shadow-neo-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          className="content-shell absolute inset-x-0 top-[6.25rem] grid gap-1 rounded-[1.25rem] border-2 border-border bg-surface p-3 shadow-neo-lg md:hidden"
          aria-label="Mobile navigation"
        >
          {portfolioContent.navigation.map((item) => (
            <Link key={item.label} to={`/${item.href}`} onClick={() => setOpen(false)} className="rounded-control px-4 py-3 font-medium hover:bg-note">
              {item.label}
            </Link>
          ))}
          <Link to="/resume" onClick={() => setOpen(false)} className="rounded-control px-4 py-3 font-medium hover:bg-note">Résumé</Link>
          <Link to="/#contact" onClick={() => setOpen(false)} className="mt-2 rounded-control border-2 border-border bg-primary px-4 py-3 font-display font-semibold shadow-neo-sm">
            Let’s talk <span aria-hidden="true">→</span>
          </Link>
        </nav>
      ) : null}
    </header>
  )
}
