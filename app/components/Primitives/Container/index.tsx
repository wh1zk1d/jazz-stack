import { twMerge } from "tailwind-merge"

export function Container({
  children,
  className,
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={twMerge("mx-auto max-w-5xl px-6", className)}>
      {children}
    </div>
  )
}
