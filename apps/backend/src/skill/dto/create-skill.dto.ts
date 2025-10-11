import { PickType } from '@nestjs/swagger';

import { Skill } from '../entities/skill.entity';

export class CreateSkillDto extends PickType(Skill, ['content', 'state']) {}
