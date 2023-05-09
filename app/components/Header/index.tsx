import { UserCircleIcon } from "@heroicons/react/24/outline"
import { Link } from "@remix-run/react"
import { config } from "~/config"
import { useOptionalUser } from "~/utils/misc"

export function Header() {
  const user = useOptionalUser()

  return (
    <header className="flex h-20 items-center justify-between bg-white px-6 shadow-sm">
      <Link to="/" className="font-semibold">
        {config.appName}
      </Link>
      {user ? (
        <div className="flex items-center space-x-4 text-sm">
          <Link
            to="/profile"
            className="inline-flex items-center rounded-md bg-transparent p-2 transition-colors hover:bg-slate-50"
          >
            <UserCircleIcon className="mr-1.5 h-4 w-4" /> {user.email}
          </Link>
        </div>
      ) : (
        <Link to="/login" className="text-sm">
          Login
        </Link>
      )}
    </header>
  )
}
