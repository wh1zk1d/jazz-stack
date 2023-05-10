import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import type { V2_MetaFunction } from "@remix-run/react"
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react"
import { z } from "zod"
import { FieldError } from "~/components/Primitives"
import { verifyLogin } from "~/models/user.server"
import { transformFieldErrors } from "~/utils/form.server"
import { safeRedirect } from "~/utils/misc"
import { createUserSession, getUserId } from "~/utils/session.server"

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect("/")
  return json({})
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
  redirectTo: z.string(),
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

  const { email, password } = result.data
  const redirectTo = safeRedirect(result.data.redirectTo)

  const user = await verifyLogin(email, password)

  if (!user) {
    return json(
      {
        success: false,
        errors: null,
        message: "Invalid email or password",
      },
      {
        status: 400,
      }
    )
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  })
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Login" }]
}

export default function Login() {
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>()

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/"

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

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <button type="submit">
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>
          {!actionData?.success && actionData?.message ? (
            <p className="text-red-600">{actionData?.message}</p>
          ) : null}
        </fieldset>
      </Form>

      <Link to="/join">No account yet?</Link>
    </div>
  )
}
