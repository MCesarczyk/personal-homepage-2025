import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ApiKeyResponse } from '../entities/api-key-response.entity';

export class RotateApiKeyResponseDto extends ApiKeyResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'API key rotated successfully',
    description: 'Message indicating the API key was rotated successfully',
  })
  message: string;
}
