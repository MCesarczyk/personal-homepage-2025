import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
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
import { RefreshTokenDto } from '../auth/dto/refreshToken.dto';
import { FeedbackMessage } from '../auth/entities/feedbackMessage.entity';
import { SignedRequest } from '../../src/auth/types';

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
      sameSite: 'strict',
    });

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
    @Res() res: Response,
    @Body() body: RefreshTokenDto,
  ): Promise<Response<TokensResponse>> {
    const { accessToken, refreshToken } = await this.authService.refresh(
      body.refreshToken,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

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
    @Req() req: SignedRequest,
    @Res() res: Response,
  ): Promise<Response<FeedbackMessage>> {
    const user = await this.authService.logout(req.user.id);

    return res.send({
      message: `${user?.email} has been logged out successfully`,
    });
  }
}
