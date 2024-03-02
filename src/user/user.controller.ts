import { Body, Controller, Get, HttpStatus, Patch, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { UserService } from '../user/user.service';
import { UserData } from '../user/entities/userData.entity';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get profile',
    type: UserData,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Req() req: Request): Promise<UserData | undefined> {
    return this.userService.getProfile(
      req.headers['authorization']?.split(' ')[1],
    );
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update profile',
    type: UserData,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateProfile(
    @Req() req: Request,
    @Body() data: UserData,
  ): Promise<UserData | undefined> {
    return this.userService.updateProfile(
      req.headers['authorization']?.split(' ')[1],
      data,
    );
  }
}
