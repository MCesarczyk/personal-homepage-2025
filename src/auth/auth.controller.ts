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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../auth/dto/signIn.dto';
import { TokensResponse } from '../auth/entities/tokensResponse.entity';
import { RefreshTokenDto } from '../auth/dto/refreshToken.dto';
import { UserData } from '../user/entities/userData.entity';
import { FeedbackMessage } from 'src/auth/entities/feedbackMessage.entity';

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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get profile',
    type: UserData,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Req() req: Request): Promise<UserData | undefined> {
    return this.authService.getProfile(
      req.headers.authorization?.split(' ')[1],
    );
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

    return res.send({ access_token: accessToken, refresh_token: refreshToken });
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
    const accessToken = req.headers.authorization?.split(' ')[1];

    const user = await this.authService.logout(accessToken);

    return res.send({
      message: `${user?.email} has been logged out successfully`,
    });
  }
}
