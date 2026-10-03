import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto, LoginUserDto } from '../../utils/dto/users.dto.js';
import type { Request, Response } from 'express';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipThrottle()
  @Post('register')
  async registerUser(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, user } = await this.authService.registerUser(
      body.username,
      body.email,
      body.password,
    );

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    return user;
  }

  @SkipThrottle()
  @Post('login')
  async loginUser(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, user } = await this.authService.loginUser(
      body.email,
      body.password,
    );

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    return user;
  }

  @Get('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const cookies = request.cookies as
      Record<string, string | undefined> | undefined;
    const { newAccessToken } = await this.authService.refreshToken(
      cookies?.['accessToken'] ?? '',
    );

    response.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logoutUser(
    @Res({ passthrough: true }) response: Response,
    @Req() request: TRequestWithUser,
  ) {
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return this.authService.logoutUser(request.user.userId);
  }
}
