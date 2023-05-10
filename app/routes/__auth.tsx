import { Outlet } from "@remix-run/react"
import { Card, PageTitle } from "~/components/Primitives"

export default function AuthLayout() {
  return (
    <div className="mx-auto grid h-screen place-items-center px-6">
      <div className="w-full max-w-lg">
        <PageTitle>Welcome.</PageTitle>
        <Card className="mt-2">
          <Outlet />
        </Card>
      </div>
    </div>
  )
}
