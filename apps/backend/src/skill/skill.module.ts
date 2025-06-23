import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService, PrismaService],
})
export class SkillModule {}
