import { Outlet } from "@remix-run/react"

export default function AuthLayout() {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  )
}
