import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { Button, Card, Container, PageTitle } from "~/components/Primitives/"
import { useUser } from "~/utils/misc"
import { requireUserId } from "~/utils/session.server"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Profile" }]
}

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request)
  return json({})
}

export default function Profile() {
  const user = useUser()

  return (
    <Container className="pt-14">
      <div className="flex items-center justify-between">
        <PageTitle>Profile</PageTitle>
        <Form action="/logout" method="POST">
          <Button variant="danger" type="submit">
            Log out
          </Button>
        </Form>
      </div>
      <Card>
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" name="email" defaultValue={user.email} />

        <Button className="mt-4">Save</Button>
      </Card>
    </Container>
  )
}
