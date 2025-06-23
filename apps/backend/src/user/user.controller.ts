import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDataDto } from './dto/user-data.dto';
import { SignedRequest } from '../auth/types';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register user',
    type: UserDataDto,
  })
  async createProfile(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDataDto | undefined> {
    const response = await this.userService.createUser(createUserDto);
    if (!response) {
      return undefined;
    }
    const { id, password, refreshToken, ...user } = response;
    return user;
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get profile',
    type: UserDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(
    @Req() req: SignedRequest,
  ): Promise<UserDataDto | undefined> {
    const response = await this.userService.getUserById(req.user.id);
    if (!response) {
      return undefined;
    }
    const { id, password, refreshToken, ...user } = response;
    return user;
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update profile',
    type: UserDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @Req() req: SignedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDataDto | undefined> {
    const response = await this.userService.updateUser(
      req.user.id,
      updateUserDto,
    );
    if (!response) {
      return undefined;
    }
    const { id, password, refreshToken, ...user } = response;
    return user;
  }
}
