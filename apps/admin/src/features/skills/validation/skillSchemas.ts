import { z } from "zod";

import { dateSchema, idSchema } from "../../../shared/validation/common";

export const skillStateSchema = z.enum(["PLANNED", "RUNNING", "COMPLETED"]);

export const skillSchema = z.object({
  id: idSchema,
  content: z.string().min(1, "Skill content is required").max(500, "Content too long"),
  state: skillStateSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export const createSkillSchema = z.object({
  content: z.string().min(1, "Skill content is required").max(500, "Content too long"),
  state: skillStateSchema.default("PLANNED"),
});

export const updateSkillSchema = z
  .object({
    content: z.string().min(1, "Skill content is required").max(500, "Content too long").optional(),
    state: skillStateSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const skillsListSchema = z.array(skillSchema);

export type Skill = z.infer<typeof skillSchema>;
export type SkillState = z.infer<typeof skillStateSchema>;
export type CreateSkillData = z.infer<typeof createSkillSchema>;
export type UpdateSkillData = z.infer<typeof updateSkillSchema>;
