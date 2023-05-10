import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node"
import type { V2_MetaFunction } from "@remix-run/react"
import { Card, Container, PageTitle } from "~/components/Primitives"
import { requireUserId } from "~/utils/session.server"

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Dashboard' }]
}

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request)
  return json({})
}

export default function Index() {
  return (
    <Container className="pt-14">
      <PageTitle>Dashboard</PageTitle>
      <Card className="flex flex-col items-start gap-2">
        <p className="font-semibold">Welcome to your new Remix App!</p>
        <p>
          You are now using the Jazz Stack. Go build something great with it.
        </p>
      </Card>
    </Container>
  )
}
