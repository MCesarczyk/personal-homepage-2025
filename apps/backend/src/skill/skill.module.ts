import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { ApiKeyService } from '../api-key/api-key.service';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillPublicController } from './skill-public.controller';

@Module({
  controllers: [SkillController, SkillPublicController],
  providers: [SkillService, PrismaService, ApiKeyService],
  exports: [SkillService],
})
export class SkillModule {}
