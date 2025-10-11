import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UserTechnology {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    description: 'The id of the user',
    required: true,
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    description: 'The id of the technology to be added',
    required: true,
  })
  technologyId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 3,
    description: 'The rating of the technology',
    required: false,
  })
  rating?: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'The date and time when the technology was created',
  })
  createdAt: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'The date and time when the technology was last updated',
  })
  updatedAt: Date;
}
