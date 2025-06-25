import { ApiProperty } from '@nestjs/swagger';

export class TokensData {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjNGQ2NTk3LTNjZGUtNGExNy05YmNkLTc0NDlhODNkMGUxYSIsImlhdCI6MTcwOTM0NzM1NCwiZXhwIjoxNzA5MzQ4MjU0fQ.sB57UGxNPvWS9quOJvFTeXD9xbQT1FEzbr6Pi4X96tk',
    description: 'Access token',
  })
  accessToken: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjNGQ2NTk3LTNjZGUtNGExNy05YmNkLTc0NDlhODNkMGUxYSIsInRva2VuSWQiOiIyNTI1Yzg5MS01YTBmLTQxOTMtOWY4Zi1hMDMxNDgxYmI5ZmQiLCJpYXQiOjE3MDkzNDczNTQsImV4cCI6MTcwOTk1MjE1NH0._NSR0tUxy1IKY0Yedz0vjYLTSLe8IBxk8jTudunVowU',
    description: 'Refresh token',
  })
  refreshToken: string;
}
