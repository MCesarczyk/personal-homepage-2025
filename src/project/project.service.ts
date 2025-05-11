import { Injectable } from '@nestjs/common';

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
    });
  }

  findAll(userId: string): Promise<ProjectDataDto[]> {
    return this.prisma.project.findMany({
      where: { userId },
    });
  }

  findOne(id: string, userId: string): Promise<ProjectDataDto | null> {
    return this.prisma.project.findUnique({
      where: { id, userId },
    });
  }

  update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ): Promise<ProjectDataDto> {
    return this.prisma.project.update({
      where: { id, userId },
      data: updateProjectDto,
    });
  }

  remove(id: string, userId: string): Promise<ProjectDataDto> {
    return this.prisma.project.delete({
      where: { id, userId },
    });
  }
}
