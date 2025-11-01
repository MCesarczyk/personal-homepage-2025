import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillPublicController } from './skill-public.controller';
import { PrismaService } from '../prisma.service';
import { ApiKeyService } from '../api-key/api-key.service';

@Module({
  controllers: [SkillController, SkillPublicController],
  providers: [SkillService, PrismaService, ApiKeyService],
})
export class SkillModule {}
