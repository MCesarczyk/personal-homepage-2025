import { Module } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectPublicController } from './project-public.controller';
import { PrismaService } from '../prisma.service';
import { ApiKeyService } from '../api-key/api-key.service';

@Module({
  controllers: [ProjectController, ProjectPublicController],
  providers: [ProjectService, PrismaService, ApiKeyService],
})
export class ProjectModule {}
