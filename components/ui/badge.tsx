import { cn } from "@/lib/utils";
import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  variant?: "default" | "secondary" | "destructive";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "default", children, ...props }, ref) => {
  const mapVariant = {
    default: "bg-background/20 text-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        mapVariant[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
