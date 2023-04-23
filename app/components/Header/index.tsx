import { UserCircleIcon } from "@heroicons/react/24/outline"
import { Link, Form } from "@remix-run/react"
import { config } from "~/config"
import { useOptionalUser } from "~/utils/misc"

export function Header() {
  const user = useOptionalUser()

  return (
    <header className="flex items-center justify-between bg-white p-6 shadow-sm">
      <Link to="/" className="font-semibold">
        {config.appName}
      </Link>
      {user ? (
        <div className="flex items-center space-x-4 text-sm">
          <Link to="/profile" className="inline-flex items-center">
            <UserCircleIcon className="mr-1.5 h-4 w-4" /> {user.email}
          </Link>
          <div className="h-[14px] w-[1px] bg-slate-400"></div>
          <Form method="POST" action="/logout">
            <button type="submit">Log out</button>
          </Form>
        </div>
      ) : (
        <Link to="/login" className="text-sm">
          Login
        </Link>
      )}
    </header>
  )
}
