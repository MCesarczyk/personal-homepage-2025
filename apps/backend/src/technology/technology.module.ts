import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { TechnologyController } from './technology.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TechnologyController],
  providers: [TechnologyService, PrismaService],
  exports: [TechnologyService],
})
export class TechnologyModule {}
