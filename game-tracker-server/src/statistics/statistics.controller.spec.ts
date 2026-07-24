import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller.js';
import { StatisticsService } from './statistics.service.js';
import { JwtService } from '@nestjs/jwt';

describe('StatisticsController', () => {
  let controller: StatisticsController;

  const mockStatisticsService = {
    getDotaProfile: jest.fn(),
    syncDotaStats: jest.fn(),
    getDotaRatings: jest.fn(),
    syncDotaRatings: jest.fn(),
  }

  const mockJwtService = {
    verifyAsync: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [StatisticsService, {
        provide: JwtService,
        useValue: mockJwtService
      }],
    }).overrideProvider(StatisticsService).useValue(mockStatisticsService).compile();

    controller = module.get<StatisticsController>(StatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
