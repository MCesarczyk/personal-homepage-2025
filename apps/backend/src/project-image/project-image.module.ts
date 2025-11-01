import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { ProjectService } from '../project/project.service';
import { ProjectImageService } from './project-image.service';
import { ProjectImageController } from './project-image.controller';

@Module({
  controllers: [ProjectImageController],
  providers: [ProjectImageService, PrismaService, ProjectService],
  exports: [ProjectImageService],
})
export class ProjectImageModule {}
