import { z } from "zod";

import { idSchema, dateSchema, urlSchema } from "../../../lib/validation/common";

export const projectImageSchema = z.object({
  id: idSchema,
  url: z.url("Invalid image URL"),
  fileName: z.string().min(1, "File name is required"),
  isCover: z.boolean().default(false),
});

export const projectSchema = z.object({
  id: idSchema,
  title: z.string().min(1, "Project title is required").max(200, "Title too long"),
  description: z.string().min(1, "Project description is required").max(2000, "Description too long"),
  codeUrl: urlSchema.refine((url) => !url || url.length > 0, {
    message: "Code URL must be valid if provided",
  }),
  demoUrl: urlSchema.refine((url) => !url || url.length > 0, {
    message: "Demo URL must be valid if provided",
  }),
  images: z.array(projectImageSchema).default([]),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export const projectsListSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;
export type ProjectImage = z.infer<typeof projectImageSchema>;
