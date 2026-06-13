import * as React from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost"
  size?: "default" | "lg" | "xl"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary: "bg-[var(--color-signal)] text-white shadow-[var(--shadow-bevel)] active:shadow-[var(--shadow-bevel-pressed)] border border-[var(--color-chrome-indigo)]",
      secondary: "bg-[var(--color-amber)] text-[var(--color-carbon)] shadow-[var(--shadow-bevel)] active:shadow-[var(--shadow-bevel-pressed)] border border-[var(--color-chrome-indigo)]",
      danger: "bg-[var(--color-error)] text-white shadow-[var(--shadow-bevel)] active:shadow-[var(--shadow-bevel-pressed)] border border-[var(--color-chrome-indigo)]",
      success: "bg-[var(--color-systems-teal)] text-white shadow-[var(--shadow-bevel)] active:shadow-[var(--shadow-bevel-pressed)] border border-[var(--color-chrome-indigo)]",
      ghost: "bg-[var(--color-carbon)] text-white shadow-[var(--shadow-bevel)] active:shadow-[var(--shadow-bevel-pressed)] border border-black",
    }

    const sizes = {
      default: "h-[28px] px-4 py-1 text-[11px]",
      lg: "h-[36px] px-6 py-2 text-[13px]",
      xl: "h-[48px] px-8 py-3 text-[15px] font-bold",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95, y: 1 }}
        className={cn(
          "inline-flex items-center justify-center rounded-[2px] font-bold uppercase tracking-[0.5px] transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
