import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    group: z.enum(['start', 'foundation', 'utilities', 'project']),
    order: z.number().default(50),
    status: z.enum(['existing', 'new', 'proposed']).optional(),
  }),
})

export const collections = { docs }
