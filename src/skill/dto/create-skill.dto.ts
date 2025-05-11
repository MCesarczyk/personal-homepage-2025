import { OmitType } from '@nestjs/swagger';

import { Skill } from '../../skill/entities/skill.entity';

export class CreateSkillDto extends OmitType(Skill, ['id', 'userId']) {}
