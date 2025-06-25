import { ApiProperty } from '@nestjs/swagger';

export class Status {
  @ApiProperty({
    example: 'ok',
    description: 'Returns current status of backend application',
  })
  status: string;
}
