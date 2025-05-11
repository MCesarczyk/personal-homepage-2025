import { OmitType } from '@nestjs/swagger';
import { Skill } from 'src/skill/entities/skill.entity';

export class SkillDataDto extends OmitType(Skill, ['userId']) {}
