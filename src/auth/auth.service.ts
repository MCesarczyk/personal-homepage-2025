import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { compare } from 'bcryptjs';

import { jwtConstants } from '../auth/constants';
import { LoginResponse } from './entities/login-response.entity';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from '../user/user.service';
import { UserData } from '../user/entities/user-data.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createAccessToken(userId: string): Promise<string> {
    return this.jwtService.sign(
      { id: userId },
      { expiresIn: jwtConstants.accessExpiration },
    );
  }

  async createRefreshToken(userId: string): Promise<string> {
    const tokenId = randomUUID();
    return this.jwtService.sign(
      { id: userId, tokenId },
      { expiresIn: jwtConstants.refreshExpiration },
    );
  }

  async login(signInDto: SignInDto): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await compare(signInDto.password, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.createAccessToken(user.id);
    const refreshToken = await this.createRefreshToken(user.id);

    const { email: userEmail } = await this.userService.updateUser(user.id, {
      refreshToken,
    });

    console.log(`${userEmail} has been logged in`);

    return { accessToken, refreshToken };
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { id } = this.jwtService.verify(refreshToken);

    const user = await this.userService.getUserById(id);

    if (user?.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.createAccessToken(user.id);
    const newRefreshToken = await this.createRefreshToken(user.id);

    await this.userService.updateUser(user.id, {
      refreshToken: newRefreshToken,
    });

    return { accessToken, refreshToken: newRefreshToken };
  }

  async changePassword(
    userId: string,
    password: string,
  ): Promise<UserData | undefined> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const updatedUser = await this.userService.updateUserPassword(
      user.id,
      password,
    );

    return updatedUser;
  }

  async logout(userId: string): Promise<UserData | undefined> {
    const user = await this.userService.getUserById(userId);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }

    await this.userService.updateUser(user.id, { refreshToken: null });

    return user;
  }
}
