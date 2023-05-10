import type { V2_MetaFunction } from "@remix-run/react"
import { Link } from "@remix-run/react"
import { twMerge } from "tailwind-merge"
import { Card, Container, PageTitle } from "~/components/Primitives"
import { buttonClasses } from "~/components/Primitives/Button"
import { config } from "~/config"
import { useOptionalUser } from "~/utils/misc"

export const meta: V2_MetaFunction = () => {
  return [{ title: config.appName }]
}

export default function Index() {
  const user = useOptionalUser()

  return (
    <Container className="pt-14">
      <PageTitle>{user ? "Dashboard" : "Hello, friend!"}</PageTitle>
      <Card className="flex flex-col items-start gap-2">
        <p className="font-semibold">Welcome to your new Remix App!</p>
        <p>
          You are now using the Jazz Stack. Go build something great with it.
        </p>
        {!user && (
          <Link
            to="/login"
            className={twMerge(
              buttonClasses.base,
              buttonClasses.variants.light,
              "mt-2"
            )}
          >
            Login
          </Link>
        )}
      </Card>
    </Container>
  )
}
