import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"

import { ScrollManager } from "@/components/site/scroll-manager"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { HomePage } from "@/pages/home-page"
import { NotFoundPage } from "@/pages/not-found-page"
import { ProjectPage } from "@/pages/project-page"
import { ResumePage } from "@/pages/resume-page"
import { portfolioContent } from "@/portfolio/content"

function PageTitle() {
  const location = useLocation()

  useEffect(() => {
    const project = portfolioContent.projects.find((item) => location.pathname.endsWith(item.slug))
    document.title = project
      ? `${project.title} — ${portfolioContent.person.name}`
      : location.pathname === "/resume"
        ? `Résumé — ${portfolioContent.person.name}`
        : location.pathname === "/"
          ? `${portfolioContent.person.name} — Applied AI Engineer`
          : `Page not found — ${portfolioContent.person.name}`
  }, [location.pathname])

  return null
}

function SiteFrame() {
  const location = useLocation()
  const isResume = location.pathname === "/resume"

  return (
    <div className="min-h-screen overflow-x-hidden">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-control border-2 border-border bg-primary px-4 py-3 font-display font-semibold focus:not-sr-only">Skip to content</a>
      <PageTitle />
      <ScrollManager />
      {!isResume ? <SiteHeader /> : null}
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isResume ? <SiteFooter /> : null}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SiteFrame />
    </BrowserRouter>
  )
}

export default App
