import { twMerge } from "tailwind-merge"

const baseClasses =
  "rounded-md px-4 py-2.5 text-sm font-semibold leading-none transition-colors inline-block"

const variants = {
  default: "bg-slate-700 text-slate-50 hover:bg-slate-800",
  danger: "bg-rose-50 text-rose-800 hover:bg-rose-100",
  light: "bg-slate-100 text-slate-800 hover:bg-slate-200",
}

export const buttonClasses = {
  base: baseClasses,
  variants,
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
