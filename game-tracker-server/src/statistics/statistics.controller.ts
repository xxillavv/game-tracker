import { Controller } from '@nestjs/common';
import { StatisticsService } from './statistics.service.js';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }

  getPlayerStatistics() {
    return this.statisticsService.getPlayerStatistics()  
  }
}
