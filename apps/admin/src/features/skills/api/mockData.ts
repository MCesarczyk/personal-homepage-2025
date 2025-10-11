import { SkillState } from "../types";
import { type Skill } from "../validation/skillSchemas";

export const mockSkills: Skill[] = [
  {
    id: "1",
    content: "Learn Advanced React Patterns",
    state: SkillState.RUNNING,
    createdAt: new Date("2024-01-10").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-15").toISOString() as unknown as Date,
  },
  {
    id: "2",
    content: "Master GraphQL",
    state: SkillState.PLANNED,
    createdAt: new Date("2024-01-12").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-12").toISOString() as unknown as Date,
  },
  {
    id: "3",
    content: "Build CI/CD Pipeline",
    state: SkillState.COMPLETED,
    createdAt: new Date("2024-01-05").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-14").toISOString() as unknown as Date,
  },
  {
    id: "4",
    content: "Study System Design",
    state: SkillState.PLANNED,
    createdAt: new Date("2024-01-13").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-13").toISOString() as unknown as Date,
  },
  {
    id: "5",
    content: "Complete AWS Certification",
    state: SkillState.RUNNING,
    createdAt: new Date("2024-01-11").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-16").toISOString() as unknown as Date,
  },
  {
    id: "6",
    content: "Implement Testing Strategy",
    state: SkillState.COMPLETED,
    createdAt: new Date("2024-01-08").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-13").toISOString() as unknown as Date,
  },
];
