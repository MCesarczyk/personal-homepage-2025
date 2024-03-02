/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UserService } from '../user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // async getAllUsers(): Promise<UserModel[]> {
  //   return this.userService.getUsersList({});
  // }
}
