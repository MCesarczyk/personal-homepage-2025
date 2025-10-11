export const SkillState = {
  PLANNED: "PLANNED",
  RUNNING: "RUNNING",
  COMPLETED: "COMPLETED",
} as const;

export type SkillState = (typeof SkillState)[keyof typeof SkillState];

export type { Skill, CreateSkillData, UpdateSkillData } from "./validation/skillSchemas";
