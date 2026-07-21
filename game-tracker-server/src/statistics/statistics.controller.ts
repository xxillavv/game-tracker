import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';

@Controller('stats')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }

  @UseGuards(AuthGuard)
  @Get('dota')
  getDotaStats(@Req() request: TRequestWithUser) {
    return this.statisticsService.getDotaProfile(request.user.userId)
  }

  @UseGuards(AuthGuard)
  @Get('dota/sync')
  syncDotaStats(@Req() request: TRequestWithUser) {
    return this.statisticsService.syncDotaStats(request.user.userId)
  }

  @UseGuards(AuthGuard)
  @Get('dota/rating')
  getRatingsHistory(@Req() request: TRequestWithUser) {
    return this.statisticsService.getDotaRatings(request.user.userId)
  }

  @UseGuards(AuthGuard)
  @Get('dota/rating/sync')
  syncRatingsHistory(@Req() request: TRequestWithUser) {
    return this.statisticsService.syncDotaRatings(request.user.userId)
  }
}