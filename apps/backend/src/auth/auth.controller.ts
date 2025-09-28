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

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { TokenRefreshResponseDto } from './dto/token-refresh-response.dto';
import { FeedbackMessage } from './entities/feedback-message.entity';
import { SignedRequest } from './types';
import { ChangePasswordPayloadDto } from './dto/change-password-payload.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { TokenRefreshPayloadDto } from './dto/token-refresh-payload.dto';
import { RegisterPayloadDto } from './dto/register-payload.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register user',
    type: RegisterResponseDto,
  })
  async register(
    @Body() registerDto: RegisterPayloadDto,
  ): Promise<RegisterResponseDto | undefined> {
    const response = await this.userService.createUser(registerDto);
    if (!response) {
      return undefined;
    }
    const { id, password, refreshToken: _, ...user } = response;

    const accessToken = await this.authService.createAccessToken(id);
    const refreshToken = await this.authService.createRefreshToken(id);

    return { ...user, refreshToken, accessToken };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Res() res: Response,
    @Body() signInDto: LoginPayloadDto,
  ): Promise<Response<LoginResponseDto>> {
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
    type: TokenRefreshResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async refresh(
    @Res() res: Response,
    @Body() body: TokenRefreshPayloadDto,
  ): Promise<Response<TokenRefreshResponseDto>> {
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
    @Body() body: ChangePasswordPayloadDto,
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
