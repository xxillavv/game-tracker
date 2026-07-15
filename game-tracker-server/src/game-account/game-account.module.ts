import { Module } from '@nestjs/common';
import { GameAccountService } from './game-account.service.js';
import { GameAccountController } from './game-account.controller.js';

@Module({
  controllers: [GameAccountController],
  providers: [GameAccountService],
})
export class GameAccountModule {}
