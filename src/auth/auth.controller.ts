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
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { FeedbackMessage } from './entities/feedback-message.entity';
import { SignedRequest } from '../auth/types';
import { LoginResponse } from './entities/login-response.entity';
import { RefreshResponse } from './entities/refresh-response.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

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
    type: LoginResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Res() res: Response,
    @Body() signInDto: SignInDto,
  ): Promise<Response<LoginResponse>> {
    const { accessToken, refreshToken } =
      await this.authService.login(signInDto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.send({ accessToken, refreshToken });
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Refresh',
    type: RefreshResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async refresh(
    @Res() res: Response,
    @Body() body: RefreshTokenDto,
  ): Promise<Response<RefreshResponse>> {
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

  @Post('password-change')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Change password',
    type: FeedbackMessage,
  })
  async changePassword(
    @Req() req: SignedRequest,
    @Body() body: ChangePasswordDto,
    @Res() res: Response,
  ): Promise<Response<FeedbackMessage>> {
    const user = await this.authService.changePassword(
      req.user.id,
      body.password,
    );

    return res.send({
      message: `${user?.email} password has been updated successfully`,
    });
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
