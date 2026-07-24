import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsController } from './connections.controller.js';
import { ConnectionsService } from './connections.service.js';
import { JwtService } from '@nestjs/jwt';

describe('GameAccountController', () => {
  let controller: ConnectionsController;

  const mockConnectionsService = {
    getUserConnectios: jest.fn(),
    createConnection: jest.fn(),
    deleteConnection: jest.fn()
  }

  const mockJwtService = {
    verifyAsync: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [ConnectionsService, {
        provide: JwtService,
        useValue: mockJwtService
      }],
    }).overrideProvider(ConnectionsService).useValue(mockConnectionsService).compile();

    controller = module.get<ConnectionsController>(ConnectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
