import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ProjectImageService } from './project-image.service';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { UpdateProjectImageDto } from './dto/update-project-image.dto';
import { ProjectImage } from 'src/project-image/entities/project-image.entity';

@Controller('project-image')
export class ProjectImageController {
  constructor(private readonly projectImageService: ProjectImageService) {}

  @Post()
  create(
    @Body() createProjectImageDto: CreateProjectImageDto,
  ): Promise<ProjectImage> {
    return this.projectImageService.create(createProjectImageDto);
  }

  @Get()
  findAll(): Promise<ProjectImage[]> {
    return this.projectImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProjectImage | null> {
    return this.projectImageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectImageDto: UpdateProjectImageDto,
  ): Promise<ProjectImage> {
    return this.projectImageService.update(id, updateProjectImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ProjectImage> {
    return this.projectImageService.remove(id);
  }
}
