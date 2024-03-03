import { ApiProperty } from '@nestjs/swagger';
import { SkillState } from '@prisma/client';

export class CreateSkillDto {
  @ApiProperty({
    example: 'skill name',
    required: true,
  })
  readonly content: string;

  @ApiProperty({
    example: 'PLANNED',
    required: true,
  })
  readonly state: SkillState;

  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    required: true,
  })
  readonly userId: string;
}
