import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
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
import { AddUserTechnologyDto } from 'src/user/dto/add-user-technology.dto';
import { UserTechnologyDataDto } from 'src/user/dto/user-technology-data.dto';
import { UpdateUserTechnologyDto } from 'src/user/dto/update-user-technology.dto';

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

  @Post('technology')
  @ApiOperation({ summary: 'Add technology to user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add technology to user',
    type: UserTechnologyDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addTechnologyToUser(
    @Req() req: SignedRequest,
    @Body() dto: AddUserTechnologyDto,
  ): Promise<UserTechnologyDataDto> {
    return this.userService.addUserTechnology(req.user.id, dto);
  }

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

  @Patch('technology/:id')
  @ApiOperation({ summary: 'Update user technology by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user technology by id',
    type: UserTechnologyDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUserTechnologyById(
    @Req() req: SignedRequest,
    @Param('id') id: string,
    @Body() userTechnologyUpdateDto: UpdateUserTechnologyDto,
  ): Promise<UserTechnologyDataDto | undefined> {
    return this.userService.updateUserTechnology(
      req.user.id,
      id,
      userTechnologyUpdateDto,
    );
  }

  @Delete('technology/:id')
  @ApiOperation({ summary: 'Remove user technology by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Remove user technology by id',
    type: UserTechnologyDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeUserTechnologyById(
    @Req() req: SignedRequest,
    @Param('id') id: string,
  ): Promise<UserTechnologyDataDto | undefined> {
    return this.userService.removeUserTechnology(req.user.id, id);
  }
}
