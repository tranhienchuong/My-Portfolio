import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <main className="content-shell grid min-h-[70vh] place-items-center py-16 text-center">
      <div>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">404 / route not indexed</p>
        <h1 className="mt-5 font-display text-5xl font-bold sm:text-7xl">Nothing retrieved.</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">This page is outside the portfolio’s bounded corpus.</p>
        <Button asChild className="mt-8"><Link to="/"><ArrowLeft /> Return home</Link></Button>
      </div>
    </main>
  )
}
