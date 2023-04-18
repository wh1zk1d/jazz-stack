import type { ActionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { redirect } from "@remix-run/node"

export const loader = async () => redirect("/")

export async function action({ request }: ActionArgs) {
  // Todo: Implement logout
  return json({})
}
