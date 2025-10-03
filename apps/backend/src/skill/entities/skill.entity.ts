import { ApiProperty } from '@nestjs/swagger';
import { SkillState } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'The date and time when the skill was created',
  })
  createdAt: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'The date and time when the skill was last updated',
  })
  updatedAt: Date;
}
