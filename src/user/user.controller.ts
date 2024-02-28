import { Body, Controller, Get, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt';
import { Public } from 'src/auth/decorators/public.decorator';

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
    bcrypt.hash(
      userData.password,
      saltRounds,
      function (err: Error, hash: string) {
        if (err) {
          throw err;
        }

        userData.password = hash;
      },
    );

    return this.userService.createUser(userData);
  }
}
