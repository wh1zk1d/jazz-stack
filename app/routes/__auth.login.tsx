import type { ActionArgs } from "@remix-run/node"
import type { V2_MetaFunction } from "@remix-run/react"
import { json } from "@remix-run/node"
import { Form, Link, useActionData, useNavigation } from "@remix-run/react"
import { z } from "zod"
import { transformFieldErrors } from "~/utils/form.server"
import { FieldError } from "~/components/FieldError"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
})

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const result = await LoginSchema.safeParseAsync(
    Object.fromEntries(formData.entries())
  )

  if (!result.success) {
    return json(
      {
        success: false,
        errors: transformFieldErrors<typeof LoginSchema>(result.error),
        message: null,
      },
      {
        status: 400,
      }
    )
  }

  // Todo: Handle login

  return json({ success: true, errors: null, message: null })
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Login" }]
}

export default function Login() {
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>()

  const isSubmitting =
    navigation.state === "submitting" && navigation.formMethod === "post"

  return (
    <div>
      <h1 className="font-bold">Login</h1>

      <Form method="POST">
        <fieldset className="my-8 space-y-4" disabled={isSubmitting}>
          <div>
            <label htmlFor="email" className="block">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
            />
            <FieldError message={actionData?.errors?.email} />
          </div>

          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="currentPassword"
            />
            <FieldError message={actionData?.errors?.password} />
          </div>

          <button type="submit">
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>
        </fieldset>
      </Form>

      <Link to="/join">No account yet?</Link>
    </div>
  )
}
