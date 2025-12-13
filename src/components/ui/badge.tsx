import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
        probable: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        uncertain: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        linkedin: "bg-blue-600/20 text-blue-400 border-blue-600/30",
        twitter: "bg-sky-500/20 text-sky-400 border-sky-500/30",
        facebook: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
        instagram: "bg-pink-500/20 text-pink-400 border-pink-500/30",
        web: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        news: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        gold: "bg-ecoba-gold/20 text-ecoba-gold border-ecoba-gold/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
