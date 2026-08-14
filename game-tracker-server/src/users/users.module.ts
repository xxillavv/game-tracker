import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  providers: [UsersService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  imports: [AuthModule, ThrottlerModule.forRoot({
    throttlers: [
      {
        ttl: 60000,
        limit: 3
      }
    ]
  })]
})
export class UsersModule { }
