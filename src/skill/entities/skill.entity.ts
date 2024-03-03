import { ApiProperty } from '@nestjs/swagger';
import { SkillState } from '@prisma/client';

export class Skill {
  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    required: true,
  })
  id: string;

  @ApiProperty({
    example: 'skill name',
    required: true,
  })
  content: string;

  @ApiProperty({
    example: 'PLANNED',
    required: true,
  })
  state: SkillState;

  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    required: true,
  })
  userId: string;
}
