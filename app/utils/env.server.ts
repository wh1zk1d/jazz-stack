import { z } from "zod"

const envVariables = z.object({
  SESSION_SECRET: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
