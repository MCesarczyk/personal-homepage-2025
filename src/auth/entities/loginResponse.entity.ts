import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example: 'r3u89jwiorwkRF$#RERWISKFWOESFE',
    description: 'Access token',
  })
  accessToken: string;

  @ApiProperty({
    example: 'fjsdionsidhfdsF4ERT#RE#WFE$#RER',
    description: 'Refresh token',
  })
  refreshToken: string;
}
