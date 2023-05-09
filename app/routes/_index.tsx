import type { V2_MetaFunction } from "@remix-run/react"
import { Link } from "@remix-run/react"
import { Card, Container, PageTitle } from "~/components/Primitives"
import { config } from "~/config"
import { useOptionalUser } from "~/utils/misc"

export const meta: V2_MetaFunction = () => {
  return [{ title: config.appName }]
}

export default function Index() {
  const user = useOptionalUser()

  return (
    <Container className="pt-14">
      <PageTitle>Dashboard</PageTitle>
      <Card className="flex flex-col gap-2">
        <p className="font-semibold">Welcome to your new Remix App!</p>
        <p>Go build something great.</p>
        {!user && <Link to="/login">Login</Link>}
      </Card>
    </Container>
  )
}
