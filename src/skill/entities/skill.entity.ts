import { SkillState } from '@prisma/client';

export class Skill {
  id: string;
  content: string;
  state: SkillState;
  userId: string;
}
