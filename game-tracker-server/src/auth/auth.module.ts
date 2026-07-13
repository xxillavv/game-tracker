import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: '10m'
    }
  })]
})
export class AuthModule { }
