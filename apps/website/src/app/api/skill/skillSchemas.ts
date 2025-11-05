import { z } from "zod";

import { dateSchema, idSchema } from "../../../lib/validation/common";

export const skillStateSchema = z.enum(["PLANNED", "RUNNING", "COMPLETED"]);

export const skillSchema = z.object({
  id: idSchema,
  content: z.string().min(1, "Skill content is required").max(500, "Content too long"),
  state: skillStateSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export const skillsListSchema = z.array(skillSchema);

export type Skill = z.infer<typeof skillSchema>;
export type SkillState = z.infer<typeof skillStateSchema>;
