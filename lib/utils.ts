import * as React from "react"

export function cn(...classes: Array<string | boolean | undefined>): string {
  return classes
    .filter(Boolean)
    .reduce((acc: string[], className: string | boolean | undefined): string[] => {
      if (typeof className === "string") {
        acc.push(className)
      } else if (Array.isArray(className)) {
        acc.push(...className)
      }
      return acc
    }, [])
    .join(" ")
}

export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = { root: null, rootMargin: "0px", threshold: 0.1 }
): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true)
          }
        })
      },
      options,
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.disconnect()
      }
    }
  }, [ref, options])

  return isIntersecting
}