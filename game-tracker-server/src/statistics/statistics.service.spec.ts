import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service.js';
import { DotaProvider } from '../providers/dota-api.service.js';
import { PrismaService } from '../lib/prisma.service.js';
import { NotFoundException } from '@nestjs/common';

describe('StatisticsService', () => {
  let service: StatisticsService;

  const mockDotaProvider = {
    getPlayerStats: jest.fn(),
    getPlayerWinrate: jest.fn(),
    getPlayerRatings: jest.fn(),
  }

  const mockPrismaService = {
    gameStats: {
      findFirst: jest.fn(),
      upsert: jest.fn()
    },
    connections: {
      findFirstOrThrow: jest.fn()
    },
    ratingHistory: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
      findMany: jest.fn()
    },
    $transaction: jest.fn().mockResolvedValue(undefined)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: DotaProvider,
          useValue: mockDotaProvider
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService
        }
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDotaProfile', () => {
    it('should return cached stats when they exist', async () => {
      const cachedStats = {
        statId: 1,
        statsConnectionId: 10,
        metadata: { name: "player1", rank: 55 },
      }

      mockPrismaService.gameStats.findFirst.mockResolvedValue(cachedStats)

      const result = await service.getDotaProfile(1)

      expect(result).toEqual(cachedStats)
      expect(mockPrismaService.gameStats.findFirst).toHaveBeenCalledWith({
        where: { connections: { connectinUserId: 1 } }
      })
      expect(mockDotaProvider.getPlayerStats).not.toHaveBeenCalled()
    })

    it('should call syncDotaStats when no cached stats exist', async () => {
      mockPrismaService.gameStats.findFirst.mockResolvedValue(null)

      const userInfo = { externalId: "12345", connectionId: 10 }
      mockPrismaService.connections.findFirstOrThrow.mockResolvedValue(userInfo)

      const stats = {
        profile: { account_id: 12345, personaname: "player1", plus: true },
        rank_tier: 55
      }
      const winrate = { win: 100, lose: 50 }

      mockDotaProvider.getPlayerStats.mockResolvedValue(stats)
      mockDotaProvider.getPlayerWinrate.mockResolvedValue(winrate)

      const upsertedStats = {
        statId: 1,
        statsConnectionId: 10,
        metadata: {
          accountId: 12345,
          name: "player1",
          rank: 55,
          matchesWin: 100,
          matchesLose: 50,
          dotaPlus: true,
        }
      }
      mockPrismaService.gameStats.upsert.mockResolvedValue(upsertedStats)

      const result = await service.getDotaProfile(1)

      expect(result).toEqual(upsertedStats)
      expect(mockDotaProvider.getPlayerStats).toHaveBeenCalledWith("12345")
      expect(mockDotaProvider.getPlayerWinrate).toHaveBeenCalledWith("12345")
    })
  })

  describe('syncDotaStats', () => {
    it('should fetch and upsert dota stats', async () => {
      const userInfo = { externalId: "12345", connectionId: 10 }
      mockPrismaService.connections.findFirstOrThrow.mockResolvedValue(userInfo)

      const stats = {
        profile: { account_id: 12345, personaname: "player1", plus: false },
        rank_tier: 42
      }
      const winrate = { win: 200, lose: 100 }

      mockDotaProvider.getPlayerStats.mockResolvedValue(stats)
      mockDotaProvider.getPlayerWinrate.mockResolvedValue(winrate)

      const expectedMetadata = {
        accountId: 12345,
        name: "player1",
        rank: 42,
        matchesWin: 200,
        matchesLose: 100,
        dotaPlus: false,
      }

      const upsertedStats = { statId: 1, statsConnectionId: 10, metadata: expectedMetadata }
      mockPrismaService.gameStats.upsert.mockResolvedValue(upsertedStats)

      const result = await service.syncDotaStats(1)

      expect(result).toEqual(upsertedStats)
      expect(mockPrismaService.connections.findFirstOrThrow).toHaveBeenCalledWith({
        where: { connectinUserId: 1 },
        select: { externalId: true, connectionId: true }
      })
      expect(mockPrismaService.gameStats.upsert).toHaveBeenCalledWith({
        where: { statsConnectionId: 10 },
        update: { metadata: expectedMetadata },
        create: { statsConnectionId: 10, metadata: expectedMetadata }
      })
    })

    it('should throw when connection is not found', async () => {
      mockPrismaService.connections.findFirstOrThrow.mockRejectedValue(new NotFoundException())

      await expect(service.syncDotaStats(999)).rejects.toThrow(NotFoundException)
    })
  })

  describe('getDotaRatings', () => {
    it('should return cached ratings when they exist', async () => {
      const cachedRatings = [
        { ratingId: 1, ratingStatId: 1, achievedAt: new Date(), ratingTier: 55 },
        { ratingId: 2, ratingStatId: 1, achievedAt: new Date(), ratingTier: 52 },
      ]

      mockPrismaService.ratingHistory.findMany.mockResolvedValue(cachedRatings)

      const result = await service.getDotaRatings(1)

      expect(result).toEqual(cachedRatings)
      expect(mockPrismaService.ratingHistory.findMany).toHaveBeenCalledTimes(1)
      expect(mockDotaProvider.getPlayerRatings).not.toHaveBeenCalled()
    })

    it('should sync and return ratings when cache is empty', async () => {
      mockPrismaService.ratingHistory.findMany.mockResolvedValueOnce([])

      const userInfo = {
        externalId: "12345",
        gameStats: { statId: 1 }
      }
      mockPrismaService.connections.findFirstOrThrow.mockResolvedValue(userInfo)

      const apiRatings = [
        { time: 1700000000000, rank_tier: 55 },
        { time: 1700100000000, rank_tier: 52 },
      ]
      mockDotaProvider.getPlayerRatings.mockResolvedValue(apiRatings)

      const syncedRatings = [
        { ratingId: 1, ratingStatId: 1, achievedAt: new Date(1700000000000), ratingTier: 55 },
        { ratingId: 2, ratingStatId: 1, achievedAt: new Date(1700100000000), ratingTier: 52 },
      ]
      mockPrismaService.ratingHistory.findMany.mockResolvedValueOnce(syncedRatings)

      mockPrismaService.ratingHistory.findMany.mockResolvedValueOnce(syncedRatings)

      const result = await service.getDotaRatings(1)

      expect(result).toEqual(syncedRatings)
      expect(mockDotaProvider.getPlayerRatings).toHaveBeenCalledWith("12345")
    })
  })

  describe('syncDotaRatings', () => {
    it('should delete old ratings and insert new ones', async () => {
      const userInfo = {
        externalId: "12345",
        gameStats: { statId: 5 }
      }
      mockPrismaService.connections.findFirstOrThrow.mockResolvedValue(userInfo)

      const apiRatings = [
        { time: 1700000000000, rank_tier: 55 },
        { time: 1700100000000, rank_tier: 52 },
      ]
      mockDotaProvider.getPlayerRatings.mockResolvedValue(apiRatings)

      const newRatings = [
        { ratingId: 10, ratingStatId: 5, achievedAt: new Date(1700100000000), ratingTier: 52 },
        { ratingId: 11, ratingStatId: 5, achievedAt: new Date(1700000000000), ratingTier: 55 },
      ]
      mockPrismaService.ratingHistory.findMany.mockResolvedValue(newRatings)

      const result = await service.syncDotaRatings(1)

      expect(result).toEqual(newRatings)
      expect(mockPrismaService.$transaction).toHaveBeenCalledWith([
        mockPrismaService.ratingHistory.deleteMany({
          where: { ratingStatId: 5 }
        }),
        mockPrismaService.ratingHistory.createMany({
          data: [
            { ratingStatId: 5, achievedAt: new Date(1700000000000), ratingTier: 55 },
            { ratingStatId: 5, achievedAt: new Date(1700100000000), ratingTier: 52 },
          ]
        })
      ])
    })

    it('should throw NotFoundException when gameStats is null', async () => {
      const userInfo = {
        externalId: "12345",
        gameStats: null
      }
      mockPrismaService.connections.findFirstOrThrow.mockResolvedValue(userInfo)

      await expect(service.syncDotaRatings(1)).rejects.toThrow(NotFoundException)
    })

    it('should throw when connection is not found', async () => {
      mockPrismaService.connections.findFirstOrThrow.mockRejectedValue(new NotFoundException())

      await expect(service.syncDotaRatings(999)).rejects.toThrow(NotFoundException)
    })
  })
});
