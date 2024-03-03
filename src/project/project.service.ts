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

  findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  findOne(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  remove(id: string): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
