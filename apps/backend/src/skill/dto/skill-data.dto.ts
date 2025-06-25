import { OmitType } from '@nestjs/swagger';

import { Skill } from '../entities/skill.entity';

export class SkillDataDto extends OmitType(Skill, ['userId']) {}
