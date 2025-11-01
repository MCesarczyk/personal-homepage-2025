import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { ApiKeyService } from '../api-key/api-key.service';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectPublicController } from './project-public.controller';

@Module({
  controllers: [ProjectController, ProjectPublicController],
  providers: [ProjectService, PrismaService, ApiKeyService],
  exports: [ProjectService],
})
export class ProjectModule {}
