import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service.js';
import { StatisticsController } from './statistics.controller.js';
import { DotaProvider } from '../providers/dota-api.service.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, DotaProvider],
  imports: [HttpModule],
})
export class StatisticsModule {}
