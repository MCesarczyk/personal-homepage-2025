import { ApiProperty } from '@nestjs/swagger';
import { SkillState } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class Skill {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    required: true,
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'skill name',
    required: true,
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'PLANNED | RUNNING | COMPLETED',
    required: true,
  })
  state: SkillState;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    required: true,
  })
  userId: string;
}
