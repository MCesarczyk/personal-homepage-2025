import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { SignedRequest } from '../auth/types';
import { ApiKeyGuard } from '../api-key/api-key.guard';
import { Public } from '../auth/decorators/public.decorator';
import { SkillService } from './skill.service';
import { SkillDataDto } from './dto/skill-data.dto';

@ApiSecurity('apiKeyAuth')
@ApiTags('skill-public')
@Controller('skill-public')
@Public()
@UseGuards(ApiKeyGuard)
export class SkillPublicController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({
    status: 200,
    description: 'Return all skills.',
    type: [SkillDataDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() request: SignedRequest): Promise<SkillDataDto[]> {
    return this.skillService.findAll(request.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill by id' })
  @ApiResponse({
    status: 200,
    description: 'Return skill by id.',
    type: SkillDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(
    @Param('id') id: string,
    @Req() request: SignedRequest,
  ): Promise<SkillDataDto | null> {
    return this.skillService.findOne(id, request.user.id);
  }
}
