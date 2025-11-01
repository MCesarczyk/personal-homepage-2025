import { Module } from '@nestjs/common';

import { ApiKeyGuard } from '../api-key/api-key.guard';
import { ApiKeyService } from '../api-key/api-key.service';
import { HealthCheckController } from '../health-check/health-check.controller';
import { HealthCheckModule } from '../health-check/health-check.module';
import { PrismaService } from '../prisma.service';
import { SkillModule } from '../skill/skill.module';
import { SkillPublicController } from '../skill/skill-public.controller';
import { ProjectModule } from '../project/project.module';
import { ProjectPublicController } from '../project/project-public.controller';
import { UserModule } from '../user/user.module';
import { UserPublicController } from '../user/user-public.controller';

@Module({
  imports: [HealthCheckModule, SkillModule, ProjectModule, UserModule],
  controllers: [
    HealthCheckController,
    SkillPublicController,
    ProjectPublicController,
    UserPublicController,
  ],
  providers: [ApiKeyService, ApiKeyGuard, PrismaService],
})
export class ApiKeyProtectedModule {}
