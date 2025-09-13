import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Technology {
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
    example: 'technology name',
    required: true,
  })
  content: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: '3',
    required: true,
  })
  rating: number;
}
