import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  @SkipThrottle()
  @UseGuards(AuthGuard)
  @Get('dota')
  getDotaMatches(@Req() request: TRequestWithUser) {
    return this.matchesService.getDotaMatches(request.user.userId)
  }

  @UseGuards(AuthGuard)
  @Get('dota/sync')
  syncDotaMatches(@Req() request: TRequestWithUser) {
    return this.matchesService.syncDotaMatches(request.user.userId)
  }
}
