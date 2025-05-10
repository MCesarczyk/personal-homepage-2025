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

import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from '../skill/entities/skill.entity';
import { SignedResponse } from 'src/auth/types';

@ApiBearerAuth()
@ApiTags('skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  @ApiOperation({ summary: 'Create skill' })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully created.',
    type: Skill,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({
    status: 200,
    description: 'Return all skills.',
    type: [Skill],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() request: SignedResponse): Promise<Skill[]> {
    return this.skillService.findAll(request.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill by id' })
  @ApiResponse({
    status: 200,
    description: 'Return skill by id.',
    type: Skill,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(
    @Param('id') id: string,
    @Req() request: SignedResponse,
  ): Promise<Skill | null> {
    return this.skillService.findOne(id, request.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update skill by id' })
  @ApiResponse({
    status: 200,
    description: 'Return skill updated.',
    type: Skill,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
    @Req() request: SignedResponse,
  ): Promise<Skill> {
    return this.skillService.update(id, updateSkillDto, request.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete skill by id' })
  @ApiResponse({
    status: 200,
    description: 'Return skill deleted.',
    type: Skill,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(
    @Param('id') id: string,
    @Req() request: SignedResponse,
  ): Promise<Skill> {
    return this.skillService.remove(id, request.user.id);
  }
}
