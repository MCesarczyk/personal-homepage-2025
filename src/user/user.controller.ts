import { Body, Controller, Get, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { hash } from 'bcrypt';
import { UserService } from '../user/user.service';
import { Public } from '../auth/decorators/public.decorator';

const saltRounds = 10;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getUsersList({});
  }

  @Public()
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
    const hashedPass = await hash(userData.password, saltRounds);

    userData.password = hashedPass;

    return this.userService.createUser(userData);
  }
}
