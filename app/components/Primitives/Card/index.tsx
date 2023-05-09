import { twMerge } from "tailwind-merge"

export function Card({
  children,
  className,
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={twMerge(
        "mt-4 rounded-md border border-slate-100 bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}
