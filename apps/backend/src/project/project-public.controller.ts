import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SignedRequest } from '../auth/types';
import { ApiKeyGuard } from '../api-key/api-key.guard';
import { Public } from '../auth/decorators/public.decorator';
import { ProjectService } from './project.service';
import { ProjectDataDto } from './dto/project-data.dto';

@ApiBearerAuth()
@ApiTags('project-public')
@Controller('project-public')
@Public()
@UseGuards(ApiKeyGuard)
export class ProjectPublicController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrieved.',
    type: [ProjectDataDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(ApiKeyGuard)
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
}
