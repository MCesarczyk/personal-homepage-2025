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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import { TokensResponse } from 'src/auth/entities/tokensResponse.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login',
    type: TokensResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Res() res: Response,
    @Body() signInDto: SignInDto,
  ): Promise<Response<TokensResponse>> {
    const { accessToken, refreshToken } =
      await this.authService.login(signInDto);

    return res.send({ access_token: accessToken, refresh_token: refreshToken });
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get profile' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Refresh',
    type: TokensResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async refresh(
    @Res() res: Response,
    @Body() body: Record<string, any>,
  ): Promise<Response<TokensResponse>> {
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
