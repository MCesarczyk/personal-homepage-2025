import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckService } from 'src/health-check/health-check.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, PrismaService],
})
export class HealthCheckModule {}
