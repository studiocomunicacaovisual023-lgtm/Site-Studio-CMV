import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const services = defineCollection({
  loader: glob({
    base: "./src/content/services",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    icon: z.enum([
      "building",
      "letter",
      "layers",
      "lightbulb",
      "truck",
      "signpost",
      "printer",
      "pen-tool",
      "gift",
    ]),
    order: z.number().int().positive(),
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      cover: image(),
      coverAlt: z.string(),
      coverPosition: z.string().default("center center"),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string().min(1),
          }),
        )
        .default([]),
      client: z.string().optional(),
      services: z.array(z.string()).default([]),
      materials: z.array(z.string()).default([]),
      challenge: z.string().optional(),
      solution: z.string().optional(),
      result: z.string().optional(),
      sourceUrl: z.url().optional(),
      publicationApproved: z.boolean().default(false),
      location: z.string().optional(),
      year: z.number().int().optional(),
      order: z.number().int().positive(),
      featured: z.boolean().default(false),
      provisional: z.boolean().default(false),
    }),
});

export const collections = { projects, services };
