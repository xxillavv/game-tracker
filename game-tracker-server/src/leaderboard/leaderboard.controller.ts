import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service.js';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @SkipThrottle()
  @Post('dota/sync')
  syncLeaderboard() {
    return this.leaderboardService.syncLeaderboard();
  }

  @SkipThrottle()
  @Get('dota')
  getLeaderboard(
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('page', new ParseIntPipe()) page: number,
  ) {
    return this.leaderboardService.getLeaderboard(limit, page);
  }
}
