import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsController } from './connections.controller.js';
import { ConnectionsService } from './connections.service.js';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guards/auth.guard.js';
import { CanActivate } from '@nestjs/common';

describe('GameAccountController', () => {
  let controller: ConnectionsController;

  const mockConnectionsService = {
    getUserConnectios: jest.fn(),
    createConnection: jest.fn(),
    deleteConnection: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [ConnectionsService],
    }).overrideProvider(ConnectionsService).useValue(mockConnectionsService).overrideGuard(AuthGuard).useValue({ canActivate: () => true }).compile();

    controller = module.get<ConnectionsController>(ConnectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
