import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Public } from '../auth/decorators/public.decorator';
import { SignInDto } from '../auth/dto/signIn.dto';
import { TokensResponse } from '../auth/entities/tokensResponse.entity';
import { FeedbackMessage } from '../auth/entities/feedbackMessage.entity';

@ApiBearerAuth()
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

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.PRODUCTION_URL?.replace('https://', '')
          : '',
    });

    console.log('User has been logged in', refreshToken);

    return res.send({ accessToken });
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
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<TokensResponse>> {
    const { accessToken, refreshToken } = await this.authService.refresh(
      req.cookies.refreshToken,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.PRODUCTION_URL?.replace('https://', '')
          : '',
    });

    console.log('Token has been refreshed', refreshToken);

    return res.send({ accessToken });
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout',
    type: FeedbackMessage,
  })
  async logout(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<FeedbackMessage>> {
    const accessToken = req.headers['authorization']?.split(' ')[1];

    const user = await this.authService.logout(accessToken);

    return res.send({
      message: `${user?.email} has been logged out successfully`,
    });
  }
}
