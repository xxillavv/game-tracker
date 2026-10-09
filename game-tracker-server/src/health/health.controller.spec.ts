import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  let controller: HealthController;

  const mockHealthService = {
    check: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    })
      .overrideProvider(HealthService)
      .useValue(mockHealthService)
      .compile();

    controller = module.get<HealthController>(HealthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return health status', async () => {
    const status = {
      status: 'ok',
      uptime: 10,
      timestamp: '2026-10-09T00:00:00.000Z',
    };
    mockHealthService.check.mockResolvedValue(status);

    const result = await controller.check();

    expect(mockHealthService.check).toHaveBeenCalledTimes(1);
    expect(result).toEqual(status);
  });

  it('should propagate ServiceUnavailableException', async () => {
    mockHealthService.check.mockRejectedValue(
      new ServiceUnavailableException('Database is unavailable.'),
    );

    await expect(controller.check()).rejects.toThrow(
      ServiceUnavailableException,
    );
  });
});
