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
import { useEffect, useRef } from "react"
import { z } from "zod"
import { Button, FieldError } from "~/components/Primitives"
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

  const passwordRef = useRef<HTMLInputElement>(null)

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/"

  const isSubmitting =
    navigation.state === "submitting" && navigation.formMethod === "post"

  useEffect(() => {
    if (!actionData?.success && actionData?.message) {
      if (passwordRef.current) {
        passwordRef.current.value = ""
      }
    }
  }, [actionData])

  return (
    <>
      <Form method="POST" className="mb-4">
        <fieldset className="space-y-4" disabled={isSubmitting}>
          <div>
            <label htmlFor="email">
              E-Mail{" "}
              <FieldError
                className="ml-[2px]"
                message={actionData?.errors?.email}
              />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              aria-invalid={!!actionData?.errors?.email}
              required
            />
          </div>

          <div>
            <label htmlFor="password">
              Password{" "}
              <FieldError
                className="ml-[2px]"
                message={actionData?.errors?.password}
              />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="currentPassword"
              ref={passwordRef}
              aria-invalid={!!actionData?.errors?.password}
            />
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Button type="submit">
            {isSubmitting ? "Logging in…" : "Log in"}
          </Button>
          {!actionData?.success && actionData?.message ? (
            <p className="text-sm font-semibold text-rose-600">
              {actionData?.message}
            </p>
          ) : null}
        </fieldset>
      </Form>

      <Link
        to="/join"
        className="text-sm text-slate-400 underline underline-offset-2"
      >
        No account yet?
      </Link>
    </>
  )
}
