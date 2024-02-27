import { Body, Controller, Get, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from '../user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Post()
  async signupUser(
    @Body()
    userData: {
      name: string;
      email: string;
      password: string;
      occupation: string;
      introduction: string;
    },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
