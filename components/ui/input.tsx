import * as React from "react"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "",
      outline: "border-2 border-input/50 focus:border-primary",
      secondary: "bg-secondary/20 border-secondary/20",
    }

    const sizeStyles = {
      default: "",
      sm: "rounded-md",
      lg: "rounded-lg",
    }

    const customClasses = `
      flex h-10 w-full rounded-md border border-input bg-background p-2 pr-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      placeholder:[--placeholder]:color-muted-foreground
      ${variantStyles[variant]}
      ${sizeStyles[size]}
    `.trim()

    return <input ref={ref} className={customClasses} {...props} />
  },
)

Input.displayName = "Input"

export { Input }