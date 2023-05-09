import { twMerge } from "tailwind-merge"

export function PageTitle({
  children,
  className,
}: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <h1 className={twMerge("text-xl font-semibold", className)}>{children}</h1>
  )
}
