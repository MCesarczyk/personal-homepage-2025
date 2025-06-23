import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Status } from './entities/status.entity';
import { Public } from '../../src/auth/decorators/public.decorator';

@Controller({ version: '1', path: 'health' })
@ApiTags('health')
@Public()
export class HealthCheckController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @ApiOkResponse({
    type: Status,
  })
  @ApiOperation({
    summary: 'Returns current status of backend application',
    tags: ['health'],
  })
  healthCheck() {
    return this.health.check();
  }
}
