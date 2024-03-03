import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProjectImageService } from './project-image.service';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { UpdateProjectImageDto } from './dto/update-project-image.dto';
import { ProjectImage } from './entities/project-image.entity';

@ApiBearerAuth()
@ApiTags('project-image')
@Controller('project-image')
export class ProjectImageController {
  constructor(private readonly projectImageService: ProjectImageService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Added image to project.',
    type: ProjectImage,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(
    @Body() createProjectImageDto: CreateProjectImageDto,
  ): Promise<ProjectImage> {
    return this.projectImageService.create(createProjectImageDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieved all project images.',
    type: [ProjectImage],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(): Promise<ProjectImage[]> {
    return this.projectImageService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retrieved a project image.',
    type: ProjectImage,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id') id: string): Promise<ProjectImage | null> {
    return this.projectImageService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updated a project image.',
    type: ProjectImage,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id') id: string,
    @Body() updateProjectImageDto: UpdateProjectImageDto,
  ): Promise<ProjectImage> {
    return this.projectImageService.update(id, updateProjectImageDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Removed a project image.',
    type: ProjectImage,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id') id: string): Promise<ProjectImage> {
    return this.projectImageService.remove(id);
  }
}
