import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProjectImageService } from './project-image.service';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { UpdateProjectImageDto } from './dto/update-project-image.dto';
import { ProjectImage } from './entities/project-image.entity';
import { SignedRequest } from '../auth/types';

@ApiBearerAuth()
@ApiTags('project-image')
@Controller('project-image')
export class ProjectImageController {
  constructor(private readonly projectImageService: ProjectImageService) {}

  @Post()
  @ApiOperation({ summary: 'Add image to project' })
  @ApiResponse({
    status: 201,
    description: 'Added image to project.',
    type: ProjectImage,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(
    @Body() createProjectImageDto: CreateProjectImageDto,
    @Req() req: SignedRequest,
  ): Promise<ProjectImage> {
    return this.projectImageService.create(createProjectImageDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all project images' })
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
  @ApiOperation({ summary: 'Get project image by ID' })
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
  @ApiOperation({ summary: 'Update project image by ID' })
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
  @ApiOperation({ summary: 'Remove project iamge by ID' })
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
