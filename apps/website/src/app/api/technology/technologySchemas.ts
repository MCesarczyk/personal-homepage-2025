import { z } from "zod";

import { dateSchema, idSchema } from "../../../lib/validation/common";

export const userTechnologySchema = z.object({
  technologyId: idSchema,
  content: z.string().min(1, "Technology name is required").max(100, "Name too long"),
  rating: z.number().int().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5"),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export const userTechnologiesListSchema = z.array(userTechnologySchema);

export type UserTechnology = z.infer<typeof userTechnologySchema>;
