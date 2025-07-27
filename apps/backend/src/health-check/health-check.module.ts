import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, PrismaService],
})
export class HealthCheckModule {}
