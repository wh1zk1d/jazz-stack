import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import { config } from "~/config"
import stylesheet from "~/styles/tailwind.css"
import { getUser } from "~/utils/session.server"

import { Header } from "./components/Header"

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  })
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href={`https://emojicdn.elk.sh/${config.emojiLogo}`} />
        {/* Inter font */}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="stylesheet" href={stylesheet} />
        <Meta />
        <Links />
      </head>
      <body className="grid min-h-screen grid-rows-[auto,1fr] bg-slate-50 text-slate-700 antialiased">
        <Header />
        <main>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
