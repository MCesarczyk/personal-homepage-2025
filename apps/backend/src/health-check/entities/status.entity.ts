import { ApiProperty } from '@nestjs/swagger';

export class Status {
  @ApiProperty({
    example: 'ok',
    description: 'Returns current status of backend application',
  })
  status: string;

  @ApiProperty({
    example: {
      database: {
        status: 'up',
      },
    },
    description: 'Information about various subsystems status',
  })
  info: Record<string, any>;

  @ApiProperty({
    example: {},
    description: 'Error details if any subsystem is down',
  })
  error: Record<string, any>;

  @ApiProperty({
    example: {
      database: {
        status: 'up',
      },
    },
    description: 'Detailed status of various subsystems',
  })
  details: Record<string, any>;
}
