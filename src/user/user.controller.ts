import { Body, Controller, Get, HttpStatus, Patch, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from '../user/user.service';
import { UserData } from '../user/entities/userData.entity';
import { SignedRequest } from '../../src/auth/types';

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
  getProfile(@Req() req: SignedRequest): Promise<UserData | undefined> {
    return this.userService.getUserById(req.user.id);
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
    @Req() req: SignedRequest,
    @Body() data: UserData,
  ): Promise<UserData | undefined> {
    return this.userService.updateUser(req.user.id, data);
  }
}
