import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { PrismaService } from '../prisma.service';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, PrismaService],
  exports: [HealthCheckService],
})
export class HealthCheckModule {}
