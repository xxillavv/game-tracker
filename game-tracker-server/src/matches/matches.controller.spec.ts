import { Test, TestingModule } from '@nestjs/testing';
import { MatchesController } from './matches.controller.js';
import { MatchesService } from './matches.service.js';

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
    }).overrideProvider(MatchesService).useValue(mockMatchesService).compile();

    controller = module.get<MatchesController>(MatchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
