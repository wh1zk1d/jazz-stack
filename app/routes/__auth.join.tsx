import type { V2_MetaFunction } from "@remix-run/react"
import { Link } from "@remix-run/react"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Sign up" }]
}

export default function Join() {
  return (
    <div>
      <h1>Sign up</h1>
      <Link to="/login">Already have an account?</Link>
    </div>
  )
}
