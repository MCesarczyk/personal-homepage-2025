import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ApiKeyResponse } from '../entities/api-key-response.entity';

export class CreateApiKeyResponseDto extends ApiKeyResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'API key created successfully',
    description:
      'Message indicating the API key action was completed successfully',
  })
  message: string;
}
