import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('stats')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @SkipThrottle()
  @UseGuards(AuthGuard)
  @Get('dota')
  getDotaStats(@Req() request: TRequestWithUser) {
    return this.statisticsService.getDotaProfile(request.user.userId);
  }

  @UseGuards(AuthGuard)
  @Post('dota/sync')
  syncDotaStats(@Req() request: TRequestWithUser) {
    return this.statisticsService.syncDotaStats(request.user.userId);
  }

  @UseGuards(AuthGuard)
  @Get('dota/rating')
  getRatingsHistory(@Req() request: TRequestWithUser) {
    return this.statisticsService.getDotaRatings(request.user.userId);
  }

  @UseGuards(AuthGuard)
  @Post('dota/rating/sync')
  syncRatingsHistory(@Req() request: TRequestWithUser) {
    return this.statisticsService.syncDotaRatings(request.user.userId);
  }
}
