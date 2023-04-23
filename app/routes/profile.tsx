import type { V2_MetaFunction } from "@remix-run/node"
import { useUser } from "~/utils/misc"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Profile" }]
}

export default function Profile() {
  const user = useUser()

  return (
    <div className="mx-auto max-w-5xl px-6 pt-16">
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="mt-4 rounded-md border-slate-100 bg-white p-6 shadow-sm">
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
          E-Mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user.email}
          className="w-full rounded-md border-zinc-300"
        />
        <button className="mt-4 rounded-md bg-slate-700 px-4 py-2.5 text-sm font-semibold leading-none tracking-wide text-slate-50 transition-colors hover:bg-slate-800">
          Save
        </button>
      </div>
    </div>
  )
}
