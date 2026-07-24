import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { GameAccountService } from './game-account.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';
import { CreateConnectionDto } from '../../utils/dto/game-account.dto.js';

@Controller('game-account')
export class GameAccountController {
  constructor(private readonly gameAccountService: GameAccountService) { }

  @UseGuards(AuthGuard)
  @Get()
  getUserAccounts(@Req() request: TRequestWithUser) {
    return this.gameAccountService.getUserAccounts(request.user.userId)
  }

  @UseGuards(AuthGuard)
  @Post()
  createConnection(@Req() request: TRequestWithUser, @Body() body: CreateConnectionDto) {
    return this.gameAccountService.createConnection(request.user.userId, body.accessToken, body.externalId, body.platformName)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteConnection(@Param('id', ParseIntPipe) id: number, @Req() request: TRequestWithUser) {
    return this.gameAccountService.deleteConnection(id, request.user.userId)
  }
}
