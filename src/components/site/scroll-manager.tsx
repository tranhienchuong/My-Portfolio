import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [location.hash, location.pathname])

  return null
}
