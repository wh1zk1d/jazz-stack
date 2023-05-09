import type { User } from "~/models/user.server"
import { getUserById } from "~/models/user.server"
import { createCookieSessionStorage, redirect } from "@remix-run/node"

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
})

const USER_SESSION_KEY = "userId"

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie")
  return sessionStorage.getSession(cookie)
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getSession(request)
  const userId = session.get(USER_SESSION_KEY)
  return userId
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  if (userId === undefined) return null

  const user = await getUserById(userId)
  if (user) return user

  throw await logout(request)
}

interface CreateUserSessionArgs {
  request: Request
  userId: string
  remember: boolean
  redirectTo: string
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: CreateUserSessionArgs) {
  const session = await getSession(request)
  session.set(USER_SESSION_KEY, userId)

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : undefined,
      }),
    },
  })
}

export async function logout(request: Request) {
  const session = await getSession(request)
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  })
}

export async function requireUserId(request: Request) {
  const userId = await getUserId(request)
  if (!userId) {
    throw redirect("/login")
  }
  return userId
}
