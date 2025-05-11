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

import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SignedRequest } from '../../src/auth/types';
import { ProjectDataDto } from 'src/project/dto/project-data.dto';

@ApiBearerAuth()
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProjectDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(
    @Req() request: SignedRequest,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(createProjectDto, request.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrieved.',
    type: [ProjectDataDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() request: SignedRequest) {
    return this.projectService.findAll(request.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: ProjectDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id') id: string, @Req() request: SignedRequest) {
    return this.projectService.findOne(id, request.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project by id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProjectDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() request: SignedRequest,
  ) {
    return this.projectService.update(id, updateProjectDto, request.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project by id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: ProjectDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id') id: string, @Req() request: SignedRequest) {
    return this.projectService.remove(id, request.user.id);
  }
}
