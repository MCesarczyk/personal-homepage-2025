import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjNGQ2NTk3LTNjZGUtNGExNy05YmNkLTc0NDlhODNkMGUxYSIsImlhdCI6MTcwOTM0NzM1NCwiZXhwIjoxNzA5MzQ4MjU0fQ.sB57UGxNPvWS9quOJvFTeXD9xbQT1FEzbr6Pi4X96tk',
    description: 'Access token',
  })
  accessToken: string;
}
