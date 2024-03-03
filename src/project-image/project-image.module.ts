import { Module } from '@nestjs/common';

import { ProjectImageService } from './project-image.service';
import { ProjectImageController } from './project-image.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProjectImageController],
  providers: [ProjectImageService, PrismaService],
})
export class ProjectImageModule {}
