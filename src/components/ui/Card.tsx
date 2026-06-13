import * as React from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-[6px] border border-[var(--color-chrome-indigo)] bg-[var(--color-platinum)] text-[var(--color-ink)] shadow-[var(--shadow-bevel)] overflow-hidden",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
