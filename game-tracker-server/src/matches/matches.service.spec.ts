import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service.js';
import { DotaProvider } from '../providers/dota-api.service.js';
import { PrismaService } from '../lib/prisma.service.js';

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

    $transaction: jest.fn(),
  };

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
