import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { HealthService } from './health.service.js';
import { PrismaService } from '../lib/prisma.service.js';

describe('HealthService', () => {
  let service: HealthService;

  const mockPrismaService = {
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return ok status when database is reachable', async () => {
    mockPrismaService.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    const result = await service.check();

    expect(mockPrismaService.$queryRaw).toHaveBeenCalledTimes(1);
    expect(result.status).toBe('ok');
    expect(typeof result.uptime).toBe('number');
    expect(typeof result.timestamp).toBe('string');
  });

  it('should throw ServiceUnavailableException when database is unreachable', async () => {
    mockPrismaService.$queryRaw.mockRejectedValue(
      new Error('Connection refused'),
    );

    await expect(service.check()).rejects.toThrow(ServiceUnavailableException);
  });
});
