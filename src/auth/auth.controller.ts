import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { Public } from '../auth/decorators/public.decorator';
import { UserData } from '../user/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(
    @Body()
    userData: UserData,
  ) {
    return this.authService.signup(userData);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() res: Response, @Body() signInDto: Record<string, any>) {
    const { accessToken, refreshToken } = await this.authService.login(
      signInDto.email,
      signInDto.password,
    );

    return res.send({ access_token: accessToken, refresh_token: refreshToken });
  }

  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Public()
  @Post('refresh')
  async refresh(@Res() res: Response, @Body() body: Record<string, any>) {
    const { accessToken, refreshToken } = await this.authService.refresh(
      body.refreshToken,
    );

    return res.send({ access_token: accessToken, refresh_token: refreshToken });
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.headers.authorization?.split(' ')[1];

    const user = await this.authService.logout(accessToken);

    return res.send({
      message: `${user?.email} has been logged out successfully`,
    });
  }
}
