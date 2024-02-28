import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.getUser({
      email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await compare(pass, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async getProfile(userId: string) {
    return await this.userService.getUser({ id: userId });
  }
}
