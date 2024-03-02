import { Controller, Get } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { UserService } from '../user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiExcludeEndpoint()
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getUsersList({});
  }
}
