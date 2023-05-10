import { twMerge } from "tailwind-merge"

export function PageTitle({
  children,
  className,
}: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <h1 className={twMerge("text-2xl font-bold tracking-tight", className)}>
      {children}
    </h1>
  )
}
