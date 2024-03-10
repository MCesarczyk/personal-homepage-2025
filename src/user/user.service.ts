import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma.service';
import { UserData } from '../user/entities/userData.entity';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<Omit<User, 'refreshToken'>> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async getProfile(
    accessToken: string | undefined,
  ): Promise<Omit<UserData, 'refreshToken'> | undefined> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const { id } = this.jwtService.verify(accessToken);

    const user = await this.getUser({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return (
      {
        email: user.email,
        name: user.name,
        password: user.password,
        occupation: user.occupation,
        introduction: user.introduction,
      } || undefined
    );
  }

  async updateProfile(
    accessToken: string | undefined,
    data: Prisma.UserUpdateInput,
  ): Promise<Omit<User, 'refreshToken'>> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const { id } = this.jwtService.verify(accessToken);

    const updatedUser = await this.updateUser({ where: { id }, data });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      password: updatedUser.password,
      occupation: updatedUser.occupation,
      introduction: updatedUser.introduction,
    };
  }
}
