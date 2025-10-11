import { z } from "zod";

import { dateSchema, idSchema } from "../../../shared/validation/common";

export const technologySchema = z.object({
  id: idSchema,
  content: z.string().min(1, "Technology name is required").max(100, "Name too long"),
});

export const userTechnologySchema = z.object({
  technologyId: idSchema,
  content: z.string().min(1, "Technology name is required").max(100, "Name too long"),
  rating: z.number().int().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5"),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export const createTechnologySchema = z.object({
  content: z.string().min(1, "Technology name is required").max(100, "Name too long"),
  rating: z.number().int().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").default(0),
});

export const updateTechnologySchema = z
  .object({
    content: z.string().min(1, "Technology name is required").max(100, "Name too long").optional(),
    rating: z.number().int().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const technologiesListSchema = z.array(technologySchema);
export const userTechnologiesListSchema = z.array(userTechnologySchema);

export type Technology = z.infer<typeof technologySchema>;
export type UserTechnology = z.infer<typeof userTechnologySchema>;
export type CreateTechnologyData = z.infer<typeof createTechnologySchema>;
export type UpdateTechnologyData = z.infer<typeof updateTechnologySchema>;
