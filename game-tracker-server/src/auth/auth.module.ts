import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'
import { AuthGuard } from '../guards/auth.guard.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
  imports: [JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: '10h'
    }
  })]
})
export class AuthModule { }
