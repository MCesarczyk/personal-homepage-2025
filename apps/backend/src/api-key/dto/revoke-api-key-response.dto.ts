import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RevokeApiKeyResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'API key revoked successfully',
    description: 'Message indicating the API key was revoked successfully',
  })
  message: string;
}
