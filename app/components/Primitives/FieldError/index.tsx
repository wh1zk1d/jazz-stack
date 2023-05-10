import { twMerge } from "tailwind-merge"

type FieldErrorProps = {
  message: string | undefined
  className?: string
}

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null
  return (
    <span className={twMerge("text-sm text-rose-700", className)}>
      {message}
    </span>
  )
}
