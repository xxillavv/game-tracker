import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'
import { StatisticsModule } from './statistics/statistics.module.js';
import { MatchesModule } from './matches/matches.module.js';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
    HttpModule,
    StatisticsModule,
    MatchesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
