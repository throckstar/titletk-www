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
    accentColor: z.enum(['coral-20', 'coral-50', 'coral-100', 'yellow-20', 'yellow-50', 'yellow-100']).optional(),
    issueNumber: z.number().optional(),
    heroImage: z.string().optional(),
    heroPortrait: z.string().optional(),
  }),
});

export const collections = { blog };
