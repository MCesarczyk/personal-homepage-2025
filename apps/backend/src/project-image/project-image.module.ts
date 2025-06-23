import { Module } from '@nestjs/common';

import { ProjectImageService } from './project-image.service';
import { ProjectImageController } from './project-image.controller';
import { PrismaService } from '../prisma.service';
import { ProjectService } from 'src/project/project.service';

@Module({
  controllers: [ProjectImageController],
  providers: [ProjectImageService, PrismaService, ProjectService],
})
export class ProjectImageModule {}
