import { twMerge } from "tailwind-merge"

const baseClasses =
  "rounded-md px-4 py-2.5 text-sm font-semibold leading-none transition-colors"

const variants = {
  default: "bg-slate-700 text-slate-50 hover:bg-slate-800",
  danger: "bg-rose-100 text-rose-800 hover:bg-rose-200",
}

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof variants
}

export function Button({
  children,
  variant = "default",
  className,
}: ButtonProps) {
  return (
    <button className={twMerge(baseClasses, variants[variant], className)}>
      {children}
    </button>
  )
}
