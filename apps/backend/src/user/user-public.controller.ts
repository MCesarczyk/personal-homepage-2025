import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SignedRequest } from '../auth/types';
import { ApiKeyGuard } from '../api-key/api-key.guard';
import { Public } from '../auth/decorators/public.decorator';
import { UserService } from './user.service';
import { UserTechnologyDataDto } from './dto/user-technology-data.dto';

@ApiBearerAuth()
@ApiTags('user-public')
@Controller('user-public')
@Public()
@UseGuards(ApiKeyGuard)
export class UserPublicController {
  constructor(private readonly userService: UserService) {}

  @Get('technology')
  @ApiOperation({ summary: 'Get user technologies' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user technologies',
    type: [UserTechnologyDataDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserTechnologies(
    @Req() req: SignedRequest,
  ): Promise<UserTechnologyDataDto[]> {
    return this.userService.getUserTechnologies(req.user.id);
  }

  @Get('technology/:id')
  @ApiOperation({ summary: 'Get user technology by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user technology by id',
    type: UserTechnologyDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserTechnologyById(
    @Req() req: SignedRequest,
    @Param('id') id: string,
  ): Promise<UserTechnologyDataDto | undefined> {
    return this.userService.getUserTechnology(req.user.id, id);
  }
}
