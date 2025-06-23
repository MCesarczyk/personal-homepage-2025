import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma.service';
import { ProjectDataDto } from 'src/project/dto/project-data.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<ProjectDataDto> {
    return this.prisma.project.create({
      data: { ...createProjectDto, userId },
      omit: {
        userId: true,
      },
    });
  }

  findAll(userId: string): Promise<ProjectDataDto[]> {
    return this.prisma.project.findMany({
      where: { userId },
      omit: {
        userId: true,
      },
    });
  }

  async findOne(id: string, userId: string): Promise<ProjectDataDto> {
    const matchedProject = await this.prisma.project.findUnique({
      where: { id, userId },
      omit: {
        userId: true,
      },
    });

    if (!matchedProject) {
      throw new NotFoundException('Project not found');
    }

    return matchedProject;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ): Promise<ProjectDataDto> {
    const updatedProject = await this.prisma.project.findUnique({
      where: { id, userId },
    });

    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.project.update({
      where: { id: updatedProject.id },
      data: updateProjectDto,
      omit: {
        userId: true,
      },
    });
  }

  async remove(id: string, userId: string): Promise<ProjectDataDto> {
    const deletedProject = await this.prisma.project.findUnique({
      where: { id, userId },
    });

    if (!deletedProject) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.project.delete({
      where: { id: deletedProject.id },
      omit: {
        userId: true,
      },
    });
  }
}
