import { OmitType } from '@nestjs/swagger';

import { Skill } from '../../skill/entities/skill.entity';

export class SkillDataDto extends OmitType(Skill, ['userId']) {}
