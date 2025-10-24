import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ApiKey {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the API key',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the user that owns the API key',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '$2b$10$EIXZQ0e5Q0e5Q0e5Q0e5Q0e',
    description: 'The hashed API key',
  })
  keyHash: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My API Key',
    description: 'A description for the API key',
  })
  description: string | null;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: 'Whether the API key is active',
  })
  isActive: boolean;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'The creation date of the API key',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'The last used date of the API key',
  })
  lastUsedAt: Date | null;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'The expiration date of the API key',
  })
  expiresAt: Date | null;
}
