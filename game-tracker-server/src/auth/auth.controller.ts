import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto, LoginUserDto } from '../dto/users.dto.js';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async registerUser(@Body() body: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, user } = await this.authService.registerUser(body.username, body.email, body.password)

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 60 * 1000),
      sameSite: 'lax'
    })

    return user
  }

  @Post('login')
  async loginUser(@Body() body: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, user } = await this.authService.loginUser(body.email, body.password)

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 60 * 1000)
    })

    return { user }
  }
}
