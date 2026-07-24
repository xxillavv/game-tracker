import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsController } from './connections.controller.js';
import { ConnectionsService } from './connections.service.js';

describe('GameAccountController', () => {
  let controller: ConnectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [ConnectionsService],
    }).compile();

    controller = module.get<ConnectionsController>(ConnectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
