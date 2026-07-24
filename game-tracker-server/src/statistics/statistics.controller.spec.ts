import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller.js';
import { StatisticsService } from './statistics.service.js';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guards/auth.guard.js';

describe('StatisticsController', () => {
  let controller: StatisticsController;

  const mockStatisticsService = {
    getDotaProfile: jest.fn(),
    syncDotaStats: jest.fn(),
    getDotaRatings: jest.fn(),
    syncDotaRatings: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [StatisticsService],
    }).overrideProvider(StatisticsService).useValue(mockStatisticsService).overrideGuard(AuthGuard).useValue({ canActivate: () => true }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
