import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse {
  @ApiProperty({
    example: 'r3u89jwior  wkRF$#RERWISKFWOESFE',
    description: 'Access token',
  })
  access_token: string;

  @ApiProperty({
    example: 'fjsdionsidhfdsF4ERT#RE#WFE$#RER',
    description: 'Refresh token',
  })
  refresh_token: string;
}
