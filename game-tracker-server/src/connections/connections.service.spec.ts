import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsService } from './connections.service.js';
import { PrismaService } from '../lib/prisma.service.js';

describe('GameAccountService', () => {
  let service: ConnectionsService;

  const tx = {
    connections: {
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
  }

  const mockPrismaService = {
    connections: {
      findMany: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
    },
    $transaction: jest.fn(async (callback) => callback(tx))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionsService, PrismaService],
    }).overrideProvider(PrismaService).useValue(mockPrismaService).compile();

    service = module.get<ConnectionsService>(ConnectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
