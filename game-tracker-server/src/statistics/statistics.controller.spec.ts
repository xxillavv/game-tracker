import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller.js';
import { StatisticsService } from './statistics.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { NotFoundException } from '@nestjs/common';
import type { TRequestWithUser } from '../../utils/types/request.types.js';

describe('StatisticsController', () => {
  let controller: StatisticsController;

  const mockStatisticsService = {
    getDotaProfile: jest.fn(),
    syncDotaStats: jest.fn(),
    getDotaRatings: jest.fn(),
    syncDotaRatings: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [StatisticsService],
    })
      .overrideProvider(StatisticsService)
      .useValue(mockStatisticsService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<StatisticsController>(StatisticsController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDotaStats', () => {
    it('should return dota profile stats for the current user', async () => {
      const stats = {
        statId: 1,
        statsConnectionId: 10,
        metadata: {
          name: 'player1',
          rank: 55,
          matchesWin: 100,
          matchesLose: 50,
        },
      };

      mockStatisticsService.getDotaProfile.mockResolvedValue(stats);

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(controller.getDotaStats(mockRequest)).resolves.toEqual(
        stats,
      );
      expect(mockStatisticsService.getDotaProfile).toHaveBeenCalledWith(1);
    });

    it('should propagate NotFoundException from service', async () => {
      mockStatisticsService.getDotaProfile.mockRejectedValue(
        new NotFoundException(),
      );

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser;

      await expect(controller.getDotaStats(mockRequest)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockStatisticsService.getDotaProfile).toHaveBeenCalledWith(999);
    });
  });

  describe('syncDotaStats', () => {
    it('should sync and return dota stats for the current user', async () => {
      const syncedStats = {
        statId: 1,
        statsConnectionId: 10,
        metadata: { name: 'player1', rank: 42 },
      };

      mockStatisticsService.syncDotaStats.mockResolvedValue(syncedStats);

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(controller.syncDotaStats(mockRequest)).resolves.toEqual(
        syncedStats,
      );
      expect(mockStatisticsService.syncDotaStats).toHaveBeenCalledWith(1);
    });

    it('should propagate NotFoundException from service', async () => {
      mockStatisticsService.syncDotaStats.mockRejectedValue(
        new NotFoundException(),
      );

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser;

      await expect(controller.syncDotaStats(mockRequest)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockStatisticsService.syncDotaStats).toHaveBeenCalledWith(999);
    });
  });

  describe('getRatingsHistory', () => {
    it('should return ratings history for the current user', async () => {
      const ratings = [
        {
          ratingId: 1,
          ratingStatId: 1,
          achievedAt: new Date(),
          ratingTier: 55,
        },
        {
          ratingId: 2,
          ratingStatId: 1,
          achievedAt: new Date(),
          ratingTier: 52,
        },
      ];

      mockStatisticsService.getDotaRatings.mockResolvedValue(ratings);

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(controller.getRatingsHistory(mockRequest)).resolves.toEqual(
        ratings,
      );
      expect(mockStatisticsService.getDotaRatings).toHaveBeenCalledWith(1);
    });

    it('should propagate NotFoundException from service', async () => {
      mockStatisticsService.getDotaRatings.mockRejectedValue(
        new NotFoundException(),
      );

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser;

      await expect(controller.getRatingsHistory(mockRequest)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockStatisticsService.getDotaRatings).toHaveBeenCalledWith(999);
    });
  });

  describe('syncRatingsHistory', () => {
    it('should sync and return ratings history for the current user', async () => {
      const syncedRatings = [
        {
          ratingId: 10,
          ratingStatId: 5,
          achievedAt: new Date(),
          ratingTier: 55,
        },
      ];

      mockStatisticsService.syncDotaRatings.mockResolvedValue(syncedRatings);

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(controller.syncRatingsHistory(mockRequest)).resolves.toEqual(
        syncedRatings,
      );
      expect(mockStatisticsService.syncDotaRatings).toHaveBeenCalledWith(1);
    });

    it('should propagate NotFoundException from service', async () => {
      mockStatisticsService.syncDotaRatings.mockRejectedValue(
        new NotFoundException(),
      );

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser;

      await expect(controller.syncRatingsHistory(mockRequest)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockStatisticsService.syncDotaRatings).toHaveBeenCalledWith(999);
    });
  });
});
