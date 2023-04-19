import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import stylesheet from "~/styles/tailwind.css"
import { config } from "~/config"

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href={`https://emojicdn.elk.sh/${config.emojiLogo}`} />
        <link rel="stylesheet" href={stylesheet} />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen antialiased">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
