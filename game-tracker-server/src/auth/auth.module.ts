import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

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
