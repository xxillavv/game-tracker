import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ConnectionsService } from './connections.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';
import { CreateConnectionDto } from '../../utils/dto/game-account.dto.js';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('connection')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) { }

  @SkipThrottle()
  @UseGuards(AuthGuard)
  @Get()
  getUserConnectios(@Req() request: TRequestWithUser) {
    return this.connectionsService.getUserConnectios(request.user.userId)
  }

  @UseGuards(AuthGuard)
  @Post()
  createConnection(@Req() request: TRequestWithUser, @Body() body: CreateConnectionDto) {
    return this.connectionsService.createConnection(request.user.userId, body.accessToken, body.externalId, body.platformName)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteConnection(@Param('id', ParseIntPipe) id: number, @Req() request: TRequestWithUser) {
    return this.connectionsService.deleteConnection(id, request.user.userId)
  }
}
