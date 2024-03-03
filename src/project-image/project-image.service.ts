import { Injectable } from '@nestjs/common';

import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { UpdateProjectImageDto } from './dto/update-project-image.dto';
import { ProjectImage } from './entities/project-image.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectImageService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProjectImageDto: CreateProjectImageDto): Promise<ProjectImage> {
    return this.prisma.projectImage.create({
      data: createProjectImageDto,
    });
  }

  findAll(): Promise<ProjectImage[]> {
    return this.prisma.projectImage.findMany();
  }

  findOne(id: string): Promise<ProjectImage | null> {
    return this.prisma.projectImage.findUnique({
      where: { id },
    });
  }

  update(
    id: string,
    updateProjectImageDto: UpdateProjectImageDto,
  ): Promise<ProjectImage> {
    return this.prisma.projectImage.update({
      where: { id },
      data: updateProjectImageDto,
    });
  }

  remove(id: string): Promise<ProjectImage> {
    return this.prisma.projectImage.delete({
      where: { id },
    });
  }
}
