import { SkillState } from '@prisma/client';

export class CreateSkillDto {
  readonly content: string;
  readonly state: SkillState;
  readonly userId: string;
}
