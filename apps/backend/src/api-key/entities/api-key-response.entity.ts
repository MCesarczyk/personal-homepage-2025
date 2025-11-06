import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApiKeyResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '51e16ff58556cc8f4812e6f6c3ec057f178bbf63974cfaadcde31ce3d548219d',
    description: 'Raw API key',
  })
  apiKey: string;
}
