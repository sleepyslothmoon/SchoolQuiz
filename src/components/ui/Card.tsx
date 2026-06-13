import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-xl shadow-slate-200/50",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
