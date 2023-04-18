import type { V2_MetaFunction } from "@remix-run/react"

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }]
}

export default function Index() {
  return (
    <div className="grid h-screen place-items-center text-center">
      <div>
        <h1 className="mb-2 text-lg font-semibold">
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
