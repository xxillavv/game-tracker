import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardService } from './leaderboard.service.js';
import { PrismaService } from '../lib/prisma.service.js';
import { DotaProvider } from '../providers/dota-api.service.js';

describe('LeaderboardService', () => {
  let service: LeaderboardService;

  const mockDotaProvider = {
    getLeaderboard: jest.fn(),
  };

  const mockPrismaService = {
    leaderboard: {
      count: jest.fn(),
      findMany: jest.fn(),
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaderboardService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: DotaProvider,
          useValue: mockDotaProvider,
        },
      ],
    }).compile();

    service = module.get<LeaderboardService>(LeaderboardService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLeaderboard', () => {
    it('should return leaderboard data without syncing when records exist', async () => {
      mockPrismaService.leaderboard.count.mockResolvedValue(50);

      const mockData = [
        { playerRank: 1, username: 'Player1', teamName: 'TeamA', teamId: 10 },
        { playerRank: 2, username: 'Player2', teamName: 'TeamB', teamId: 20 },
      ];

      mockPrismaService.$transaction.mockResolvedValue([50, mockData]);

      const result = await service.getLeaderboard(10, 2);

      expect(result).toEqual({
        data: mockData,
        metadata: {
          currentPage: 2,
          totalCount: 50,
          totalPages: 5,
        },
      });

      expect(mockPrismaService.leaderboard.count).toHaveBeenCalledTimes(2);
      expect(mockDotaProvider.getLeaderboard).not.toHaveBeenCalled();
      expect(mockPrismaService.leaderboard.findMany).toHaveBeenCalledWith({
        take: 10,
        skip: 10,
        orderBy: {
          playerRank: 'asc',
        },
      });
    });

    it('should sync leaderboard first when count is 0', async () => {
      mockPrismaService.leaderboard.count.mockResolvedValueOnce(0);

      const apiData = {
        leaderboard: [
          { rank: 1, name: 'Player1', team_tag: 'TeamA', team_id: 10 },
        ],
      };
      mockDotaProvider.getLeaderboard.mockResolvedValue(apiData);

      const mockData = [
        { playerRank: 1, username: 'Player1', teamName: 'TeamA', teamId: 10 },
      ];
      mockPrismaService.$transaction.mockResolvedValueOnce(undefined); // for syncLeaderboard
      mockPrismaService.$transaction.mockResolvedValueOnce([1, mockData]); // for getLeaderboard

      const result = await service.getLeaderboard(10, 1);

      expect(result).toEqual({
        data: mockData,
        metadata: {
          currentPage: 1,
          totalCount: 1,
          totalPages: 1,
        },
      });

      expect(mockDotaProvider.getLeaderboard).toHaveBeenCalledTimes(1);
    });

    it('should use default limit and page parameters if not provided', async () => {
      mockPrismaService.leaderboard.count.mockResolvedValue(10);
      mockPrismaService.$transaction.mockResolvedValue([10, []]);

      const result = await service.getLeaderboard();

      expect(result.metadata.currentPage).toBe(1);
      expect(mockPrismaService.leaderboard.findMany).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
        orderBy: {
          playerRank: 'asc',
        },
      });
    });
  });

  describe('syncLeaderboard', () => {
    it('should fetch data from dotaProvider and update leaderboard in transaction', async () => {
      const apiData = {
        leaderboard: [
          { rank: 1, name: 'Player1', team_tag: 'TeamA', team_id: 10 },
          { rank: 2, name: 'Player2', team_tag: 'TeamB', team_id: 20 },
        ],
      };
      mockDotaProvider.getLeaderboard.mockResolvedValue(apiData);
      mockPrismaService.$transaction.mockResolvedValue(undefined);

      await service.syncLeaderboard();

      expect(mockDotaProvider.getLeaderboard).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.leaderboard.deleteMany).toHaveBeenCalled();
      expect(mockPrismaService.leaderboard.createMany).toHaveBeenCalledWith({
        data: [
          { playerRank: 1, username: 'Player1', teamName: 'TeamA', teamId: 10 },
          { playerRank: 2, username: 'Player2', teamName: 'TeamB', teamId: 20 },
        ],
      });
      expect(mockPrismaService.$transaction).toHaveBeenCalledTimes(1);
    });
  });
});
