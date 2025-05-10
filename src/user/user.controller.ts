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

import { UserService } from '../user/user.service';
import { UserData } from './entities/user-data.entity';
import { SignedRequest } from '../../src/auth/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

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
    type: UserData,
  })
  async createProfile(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserData | undefined> {
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
    type: UserData,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req: SignedRequest): Promise<UserData | undefined> {
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
    type: UserData,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @Req() req: SignedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserData | undefined> {
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
