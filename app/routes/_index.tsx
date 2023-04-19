import type { V2_MetaFunction } from "@remix-run/react"
import { Form } from "@remix-run/react"
import { Link } from "@remix-run/react"
import { config } from "~/config"
import { useOptionalUser } from "~/utils/misc"

export const meta: V2_MetaFunction = () => {
  return [{ title: config.appName }]
}

export default function Index() {
  const user = useOptionalUser()

  return (
    <div className="grid h-screen place-items-center text-center">
      <div>
        {user ? (
          <div>
            <p>Logged in as {user.email}</p>
            <Form method="POST" action="/logout">
              <button type="submit">Log out</button>
            </Form>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <h1 className="mb-2 mt-4 text-lg font-semibold">
          Welcome to the Remix Jazz Stack!
        </h1>
        <p>
          Edit{" "}
          <code className="rounded-lg bg-slate-100 px-2 py-1">
            /app/routes/_index.tsx
          </code>{" "}
          to get started.
        </p>
      </div>
    </div>
  )
}
