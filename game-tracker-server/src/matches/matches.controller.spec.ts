import { Test, TestingModule } from '@nestjs/testing';
import { MatchesController } from './matches.controller.js';
import { MatchesService } from './matches.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { NotFoundException } from '@nestjs/common';
import type { TRequestWithUser } from '../../utils/types/request.types.js';

describe('MatchesController', () => {
  let controller: MatchesController;

  const mockMatchesService = {
    getDotaMatches: jest.fn(),
    syncDotaMatches: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchesController],
      providers: [MatchesService],
    }).overrideProvider(MatchesService).useValue(mockMatchesService).overrideGuard(AuthGuard).useValue({ canActivate: () => true }).compile();

    controller = module.get<MatchesController>(MatchesController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDotaMatches', () => {
    it('should return dota matches for the current user', async () => {
      const matches = [
        { matchId: 1, connectionMatchId: 10, gameMatchId: 1, metadata: { kills: 10, deaths: 3 } },
        { matchId: 2, connectionMatchId: 10, gameMatchId: 1, metadata: { kills: 5, deaths: 8 } },
      ]

      mockMatchesService.getDotaMatches.mockResolvedValue(matches)

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser

      await expect(controller.getDotaMatches(mockRequest)).resolves.toEqual(matches)
      expect(mockMatchesService.getDotaMatches).toHaveBeenCalledWith(1)
    })

    it('should propagate NotFoundException from service', async () => {
      mockMatchesService.getDotaMatches.mockRejectedValue(new NotFoundException())

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser

      await expect(controller.getDotaMatches(mockRequest)).rejects.toThrow(NotFoundException)
      expect(mockMatchesService.getDotaMatches).toHaveBeenCalledWith(999)
    })
  })

  describe('syncDotaMatches', () => {
    it('should sync dota matches for the current user', async () => {
      mockMatchesService.syncDotaMatches.mockResolvedValue(undefined)

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser

      await expect(controller.syncDotaMatches(mockRequest)).resolves.toBeUndefined()
      expect(mockMatchesService.syncDotaMatches).toHaveBeenCalledWith(1)
    })

    it('should propagate NotFoundException from service', async () => {
      mockMatchesService.syncDotaMatches.mockRejectedValue(new NotFoundException())

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser

      await expect(controller.syncDotaMatches(mockRequest)).rejects.toThrow(NotFoundException)
      expect(mockMatchesService.syncDotaMatches).toHaveBeenCalledWith(999)
    })
  })
});
