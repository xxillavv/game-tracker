import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service.js';
import { LeaderboardController } from './leaderboard.controller.js';
import { DotaProvider } from '../providers/dota-api.service.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [LeaderboardController],
  providers: [LeaderboardService, DotaProvider],
  imports: [HttpModule],
})
export class LeaderboardModule {}
