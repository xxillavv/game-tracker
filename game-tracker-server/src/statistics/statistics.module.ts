import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service.js';
import { StatisticsController } from './statistics.controller.js';
import { DotaApiProvider } from '../providers/dota-api.service.js';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, DotaApiProvider],
})
export class StatisticsModule {}
