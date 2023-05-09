export function FieldError({ message }: { message: string | undefined }) {
  if (!message) return null
  return <p>{message}</p>
}
