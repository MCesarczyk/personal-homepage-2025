import { Injectable } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  findAll(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { userId },
    });
  }

  findOne(id: string, userId: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id, userId },
    });
  }

  update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ): Promise<Project> {
    return this.prisma.project.update({
      where: { id, userId },
      data: updateProjectDto,
    });
  }

  remove(id: string, userId: string): Promise<Project> {
    return this.prisma.project.delete({
      where: { id, userId },
    });
  }
}
