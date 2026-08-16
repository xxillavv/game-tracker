import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service.js';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) { }

  @Post("dota/sync")
  syncLeaderboard() {
    return this.leaderboardService.syncLeaderboard()
  }

  @Get("dota")
  getLeaderboard(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.leaderboardService.getLeaderboard(limit)
  }
}
