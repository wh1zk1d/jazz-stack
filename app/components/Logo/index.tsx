import { Link } from "@remix-run/react"
import { config } from "~/config"

export function Logo() {
  return (
    <Link to="/" className="inline-flex items-center">
      <img
        src={`https://emojicdn.elk.sh/${config.emojiLogo}`}
        alt=""
        className="mr-2 h-6 w-6"
      />
      <span className="font-bold tracking-tight">{config.appName}</span>
    </Link>
  )
}
