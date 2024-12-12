import { z } from 'zod'

const envSchema = z.object({
  GITHUB_ACCESS_TOKEN: z.string().min(1),
  API_VERSION: z.string().min(1).startsWith('v'),
})

export const env = envSchema.parse(Bun.env)
