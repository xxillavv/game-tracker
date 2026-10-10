import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { StatisticsModule } from './statistics/statistics.module.js';
import { MatchesModule } from './matches/matches.module.js';
import { ConnectionsModule } from './connections/connections.module.js';
import { PrismaModule } from './lib/prisma.module.js';
import { LeaderboardModule } from './leaderboard/leaderboard.module.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    StatisticsModule,
    MatchesModule,
    ConnectionsModule,
    LeaderboardModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
