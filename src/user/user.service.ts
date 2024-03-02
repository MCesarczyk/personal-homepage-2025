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
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async getProfile(
    accessToken: string | undefined,
  ): Promise<UserData | undefined> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const { id } = this.jwtService.verify(accessToken);

    const user = await this.getUser({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user || undefined;
  }

  async updateProfile(
    accessToken: string | undefined,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const { id } = this.jwtService.verify(accessToken);

    return this.updateUser({ where: { id }, data });
  }
}
