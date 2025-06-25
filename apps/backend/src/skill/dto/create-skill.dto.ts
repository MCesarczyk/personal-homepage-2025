import { OmitType } from '@nestjs/swagger';

import { Skill } from '../entities/skill.entity';

export class CreateSkillDto extends OmitType(Skill, ['id', 'userId']) {}
