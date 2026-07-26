import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service.js';
import { DotaProvider } from '../providers/dota-api.service.js';
import { PrismaService } from '../lib/prisma.service.js';
import { NotFoundException } from '@nestjs/common';

describe('MatchesService', () => {
  let service: MatchesService;

  const mockDotaProvider = {
    getMatches: jest.fn(),
  };

  const mockPrismaService = {
    games: {
      findFirstOrThrow: jest.fn(),
    },

    gameStats: {
      findFirstOrThrow: jest.fn(),
    },

    matches: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },

    $transaction: jest.fn().mockResolvedValue(undefined),
  };

  const dotaGame = { gameId: 1, name: "DOTA" }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
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

    service = module.get<MatchesService>(MatchesService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDotaMatches', () => {
    it('should return cached matches when they exist', async () => {
      mockPrismaService.games.findFirstOrThrow.mockResolvedValue(dotaGame)
      mockPrismaService.gameStats.findFirstOrThrow.mockResolvedValue({ statId: 5 })

      const cachedMatches = [
        { matchId: 1, statsMatchId: 5, gameMatchId: 1, metadata: { kills: 10 } },
        { matchId: 2, statsMatchId: 5, gameMatchId: 1, metadata: { kills: 5 } },
      ]
      mockPrismaService.matches.findMany.mockResolvedValue(cachedMatches)

      const result = await service.getDotaMatches(1)

      expect(result).toEqual(cachedMatches)
      expect(mockPrismaService.matches.findMany).toHaveBeenCalledWith({
        where: { statsMatchId: 5, gameMatchId: 1 }
      })
      expect(mockDotaProvider.getMatches).not.toHaveBeenCalled()
    })

    it('should sync and return matches when cache is empty', async () => {
      mockPrismaService.games.findFirstOrThrow.mockResolvedValue(dotaGame)

      mockPrismaService.gameStats.findFirstOrThrow
        .mockResolvedValueOnce({ statId: 5 })
        .mockResolvedValueOnce({
          statId: 5,
          connections: { externalId: "12345" }
        })

      mockPrismaService.matches.findMany.mockResolvedValueOnce([])

      const apiMatches = [
        {
          assists: 5, deaths: 3, kills: 10, duration: 2400,
          gold_per_min: 500, lane_role: 1, match_id: 7001,
          radiant_win: true, tower_damage: 3000, hero_damage: 25000
        },
      ]
      mockDotaProvider.getMatches.mockResolvedValue(apiMatches)

      const syncedMatches = [
        { matchId: 1, statsMatchId: 5, gameMatchId: 1, metadata: { kills: 10 } },
      ]
      mockPrismaService.matches.findMany.mockResolvedValueOnce(syncedMatches)

      const result = await service.getDotaMatches(1)

      expect(result).toEqual(syncedMatches)
      expect(mockDotaProvider.getMatches).toHaveBeenCalledWith("12345")
    })

    it('should throw when game stats are not found', async () => {
      mockPrismaService.games.findFirstOrThrow.mockResolvedValue(dotaGame)
      mockPrismaService.gameStats.findFirstOrThrow.mockRejectedValue(new NotFoundException())

      await expect(service.getDotaMatches(999)).rejects.toThrow(NotFoundException)
    })
  })

  describe('syncDotaMatches', () => {
    it('should delete old matches and insert new ones from API', async () => {
      mockPrismaService.games.findFirstOrThrow.mockResolvedValue(dotaGame)
      mockPrismaService.gameStats.findFirstOrThrow.mockResolvedValue({
        statId: 5,
        connections: { externalId: "12345" }
      })

      const apiMatches = [
        {
          assists: 5, deaths: 3, kills: 10, duration: 2400,
          gold_per_min: 500, lane_role: 1, match_id: 7001,
          radiant_win: true, tower_damage: 3000, hero_damage: 25000
        },
        {
          assists: 2, deaths: 8, kills: 3, duration: 1800,
          gold_per_min: 350, lane_role: 2, match_id: 7002,
          radiant_win: false, tower_damage: 500, hero_damage: 12000
        },
      ]
      mockDotaProvider.getMatches.mockResolvedValue(apiMatches)

      await service.syncDotaMatches(1)

      expect(mockDotaProvider.getMatches).toHaveBeenCalledWith("12345")
      expect(mockPrismaService.$transaction).toHaveBeenCalledWith([
        mockPrismaService.matches.deleteMany({
          where: { statsMatchId: 5, gameMatchId: 1 }
        }),
        mockPrismaService.matches.createMany({
          data: [
            {
              gameMatchId: 1,
              statsMatchId: 5,
              metadata: {
                assists: 5, deaths: 3, kills: 10, duration: 2400,
                goldPerMinute: 500, role: 1, matchId: 7001,
                isRadiantWin: true, towerDamage: 3000, heroDamage: 25000
              }
            },
            {
              gameMatchId: 1,
              statsMatchId: 5,
              metadata: {
                assists: 2, deaths: 8, kills: 3, duration: 1800,
                goldPerMinute: 350, role: 2, matchId: 7002,
                isRadiantWin: false, towerDamage: 500, heroDamage: 12000
              }
            },
          ]
        })
      ])
    })

    it('should throw NotFoundException when externalId is missing', async () => {
      mockPrismaService.games.findFirstOrThrow.mockResolvedValue(dotaGame)
      mockPrismaService.gameStats.findFirstOrThrow.mockResolvedValue({
        statId: 5,
        connections: { externalId: null }
      })

      await expect(service.syncDotaMatches(1)).rejects.toThrow(NotFoundException)
      expect(mockDotaProvider.getMatches).not.toHaveBeenCalled()
    })

    it('should throw when game stats are not found', async () => {
      mockPrismaService.games.findFirstOrThrow.mockResolvedValue(dotaGame)
      mockPrismaService.gameStats.findFirstOrThrow.mockRejectedValue(new NotFoundException())

      await expect(service.syncDotaMatches(999)).rejects.toThrow(NotFoundException)
    })
  })
});
