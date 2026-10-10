import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardController } from './leaderboard.controller.js';
import { LeaderboardService } from './leaderboard.service.js';

describe('LeaderboardController', () => {
  let controller: LeaderboardController;

  const mockLeaderboardService = {
    syncLeaderboard: jest.fn(),
    getLeaderboard: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderboardController],
      providers: [LeaderboardService],
    })
      .overrideProvider(LeaderboardService)
      .useValue(mockLeaderboardService)
      .compile();

    controller = module.get<LeaderboardController>(LeaderboardController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('syncLeaderboard', () => {
    it('should call syncLeaderboard on service', async () => {
      mockLeaderboardService.syncLeaderboard.mockResolvedValue(undefined);

      await expect(controller.syncLeaderboard()).resolves.toBeUndefined();
      expect(mockLeaderboardService.syncLeaderboard).toHaveBeenCalledTimes(1);
    });
  });

  describe('getLeaderboard', () => {
    it('should return leaderboard data and metadata', async () => {
      const mockResult = {
        data: [
          { playerRank: 1, username: 'Player1', teamName: 'TeamA', teamId: 10 },
          { playerRank: 2, username: 'Player2', teamName: 'TeamB', teamId: 20 },
        ],
        metadata: {
          currentPage: 1,
          totalCount: 2,
          totalPages: 1,
        },
      };

      mockLeaderboardService.getLeaderboard.mockResolvedValue(mockResult);

      const result = await controller.getLeaderboard(10, 1);

      expect(result).toEqual(mockResult);
      expect(mockLeaderboardService.getLeaderboard).toHaveBeenCalledWith(10, 1);
    });
  });
});
