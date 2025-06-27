export type SkillState = "PLANNED" | "RUNNING" | "COMPLETED";

export interface SkillDto {
  id: string;
  content: string;
  state: SkillState;
  userId: string;
}
