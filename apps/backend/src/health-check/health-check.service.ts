import { Injectable } from '@nestjs/common';
import {
  PrismaHealthIndicator,
  HealthCheckService as PrismaHealthCheckService,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HealthCheckService {
  constructor(
    private health: PrismaHealthCheckService,
    private db: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  async check() {
    return this.health.check([
      async () => this.db.pingCheck('database', this.prisma),
    ]);
  }
}
