import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TechnologyService } from './technology.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { TechnologyDataDto } from './dto/technology-data.dto';

@ApiBearerAuth()
@ApiTags('technology')
@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  @ApiOperation({ summary: 'Create technology' })
  @ApiResponse({
    status: 201,
    description: 'The technology has been successfully created.',
    type: TechnologyDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(
    @Body() createTechnologyDto: CreateTechnologyDto,
  ): Promise<TechnologyDataDto> {
    return this.technologyService.create(createTechnologyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all technologies' })
  @ApiResponse({
    status: 200,
    description: 'Return all technologies.',
    type: [TechnologyDataDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(): Promise<TechnologyDataDto[]> {
    return this.technologyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get technology by id' })
  @ApiResponse({
    status: 200,
    description: 'Return technology by id.',
    type: TechnologyDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id') id: string): Promise<TechnologyDataDto | null> {
    return this.technologyService.findByContent(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update technology by id' })
  @ApiResponse({
    status: 200,
    description: 'Return technology updated.',
    type: TechnologyDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id') id: string,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<TechnologyDataDto> {
    return this.technologyService.update(id, updateTechnologyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete technology by id' })
  @ApiResponse({
    status: 200,
    description: 'Return technology deleted.',
    type: TechnologyDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id') id: string): Promise<TechnologyDataDto> {
    return this.technologyService.remove(id);
  }
}
