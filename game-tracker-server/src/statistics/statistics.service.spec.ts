import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service.js';
import { DotaProvider } from '../providers/dota-api.service.js';
import { PrismaService } from '../lib/prisma.service.js';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
