import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { GameAccountModule } from './game-account/game-account.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), GameAccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
