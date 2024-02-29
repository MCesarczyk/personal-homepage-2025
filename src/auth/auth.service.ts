import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { compare, hash } from 'bcrypt';

import { UserService } from '../user/user.service';
import { jwtConstants, securityConstants } from '../auth/constants';
import { UserData } from 'src/user/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createAccessToken(userId: string) {
    return this.jwtService.sign(
      { id: userId },
      { expiresIn: jwtConstants.accessExpiration },
    );
  }

  async createRefreshToken(userId: string) {
    const tokenId = randomUUID();
    return this.jwtService.sign(
      { id: userId, tokenId },
      { expiresIn: jwtConstants.refreshExpiration },
    );
  }

  async signup(userData: UserData) {
    const hashedPass = await hash(
      userData.password,
      securityConstants.saltRounds,
    );

    userData.password = hashedPass;

    return this.userService.createUser(userData);
  }

  async login(email: string, password: string): Promise<{ userId: string }> {
    const user = await this.userService.getUser({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await compare(password, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return { userId: user.id };
  }

  async getProfile(userId: string) {
    return await this.userService.getUser({ id: userId });
  }
}
