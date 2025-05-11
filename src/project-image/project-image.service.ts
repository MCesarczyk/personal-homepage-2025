import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { UpdateProjectImageDto } from './dto/update-project-image.dto';
import { ProjectImage } from './entities/project-image.entity';
import { PrismaService } from '../prisma.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class ProjectImageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectService: ProjectService,
  ) {}

  async create(
    createProjectImageDto: CreateProjectImageDto,
    userId: string,
  ): Promise<ProjectImage> {
    const { projectId } = createProjectImageDto;
    const project = await this.projectService.findOne(projectId, userId);

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    return this.prisma.projectImage.create({
      data: createProjectImageDto,
    });
  }

  findAll(): Promise<ProjectImage[]> {
    return this.prisma.projectImage.findMany();
  }

  async findOne(id: string): Promise<ProjectImage | null> {
    const matchedImage = await this.prisma.projectImage.findUnique({
      where: { id },
    });

    if (!matchedImage) {
      throw new NotFoundException(`Project image with id ${id} not found`);
    }

    return matchedImage;
  }

  async update(
    id: string,
    updateProjectImageDto: UpdateProjectImageDto,
  ): Promise<ProjectImage> {
    const updatedImage = await this.prisma.projectImage.findUnique({
      where: { id },
    });

    if (!updatedImage) {
      throw new NotFoundException(`Project image with id ${id} not found`);
    }

    return this.prisma.projectImage.update({
      where: { id },
      data: updateProjectImageDto,
    });
  }

  async remove(id: string): Promise<ProjectImage> {
    const deletedImage = await this.prisma.projectImage.findUnique({
      where: { id },
    });

    if (!deletedImage) {
      throw new NotFoundException(`Project image with id ${id} not found`);
    }

    return this.prisma.projectImage.delete({
      where: { id },
    });
  }
}
