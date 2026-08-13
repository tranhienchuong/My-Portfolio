import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "neo-press inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--component-button-radius)] border-2 border-[var(--component-button-border)] font-display text-sm font-semibold shadow-[var(--component-button-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "clay-button bg-[var(--component-button-primary-bg)] text-[var(--component-button-primary-fg)] active:bg-[var(--component-button-primary-active-bg)] active:text-[var(--component-button-primary-active-fg)]",
        secondary:
          "clay-button bg-[var(--component-button-secondary-bg)] text-[var(--component-button-secondary-fg)]",
        outline:
          "clay-button bg-[var(--component-button-outline-bg)] text-[var(--component-button-outline-fg)]",
        ghost:
          "border-transparent bg-transparent text-foreground shadow-none hover:border-border hover:bg-note",
        link:
          "min-h-0 border-transparent bg-transparent p-0 text-foreground shadow-none underline-offset-4 hover:underline",
        destructive:
          "clay-button bg-[var(--component-button-destructive-bg)] text-[var(--component-button-destructive-fg)] active:bg-[var(--semantic-color-destructive-hover)]",
      },
      size: {
        sm: "h-11 px-4",
        default: "h-12 px-5",
        lg: "h-14 px-7 text-base",
        icon: "size-11 min-h-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button"

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }
