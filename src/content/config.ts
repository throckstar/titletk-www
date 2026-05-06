import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    author: z.string().optional(),
    category: z.enum(['Strategy', 'Field Notes', 'Press', 'Studio']).optional(),
    cover: z.enum(['editorial', 'ticker', 'index', 'staggered']).optional(),
  }),
});

export const collections = { blog };
