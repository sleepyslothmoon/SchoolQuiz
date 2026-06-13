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
      primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/50",
      secondary: "bg-purple-500 text-white hover:bg-purple-600 shadow-purple-500/50",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-red-500/50",
      success: "bg-green-500 text-white hover:bg-green-600 shadow-green-500/50",
      ghost: "bg-transparent text-slate-600 hover:bg-slate-100 shadow-none",
    }

    const sizes = {
      default: "h-12 px-6 py-2 text-lg",
      lg: "h-16 px-8 py-4 text-xl",
      xl: "h-24 px-12 py-6 text-3xl font-bold",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 shadow-lg",
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
