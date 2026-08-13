import { cva, type VariantProps } from "class-variance-authority"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const metricVariants = cva("", {
  variants: {
    tone: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      accent: "bg-accent text-accent-foreground",
      note: "bg-note text-note-foreground",
      surface: "bg-surface text-foreground",
    },
  },
  defaultVariants: {
    tone: "surface",
  },
})

interface MetricCardProps extends VariantProps<typeof metricVariants> {
  value: string
  label: string
  note?: string
  className?: string
}

function MetricCard({ value, label, note, tone, className }: MetricCardProps) {
  return (
    <Card variant="flat" className={cn("p-5", metricVariants({ tone }), className)}>
      <p className="font-display text-3xl font-bold leading-none text-current sm:text-4xl">
        {value}
      </p>
      <p className="mt-3 font-display text-sm font-semibold text-current">{label}</p>
      {note ? <p className="mt-1 text-xs leading-relaxed opacity-75">{note}</p> : null}
    </Card>
  )
}

export { MetricCard }
