import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
