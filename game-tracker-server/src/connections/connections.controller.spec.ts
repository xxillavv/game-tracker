import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsController } from './connections.controller.js';
import { ConnectionsService } from './connections.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { NotFoundException } from '@nestjs/common';
import type { TRequestWithUser } from '../../utils/types/request.types.js';

describe('ConnectionsController', () => {
  let controller: ConnectionsController;

  const mockConnectionsService = {
    getUserConnectios: jest.fn(),
    createConnection: jest.fn(),
    deleteConnection: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [ConnectionsService],
    })
      .overrideProvider(ConnectionsService)
      .useValue(mockConnectionsService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ConnectionsController>(ConnectionsController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserConnectios', () => {
    it('should return all connections for the current user', async () => {
      const connections = [
        {
          connectionId: 1,
          platformName: 'STEAM',
          externalId: '12345',
          accessToken: null,
        },
        {
          connectionId: 2,
          platformName: 'RIOT',
          externalId: '67890',
          accessToken: 'token123',
        },
      ];

      mockConnectionsService.getUserConnectios.mockResolvedValue(connections);

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(controller.getUserConnectios(mockRequest)).resolves.toEqual(
        connections,
      );
      expect(mockConnectionsService.getUserConnectios).toHaveBeenCalledWith(1);
    });

    it('should return empty array when user has no connections', async () => {
      mockConnectionsService.getUserConnectios.mockResolvedValue([]);

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser;

      await expect(controller.getUserConnectios(mockRequest)).resolves.toEqual(
        [],
      );
      expect(mockConnectionsService.getUserConnectios).toHaveBeenCalledWith(
        999,
      );
    });
  });

  describe('createConnection', () => {
    it('should create a connection and return it', async () => {
      const createdConnection = {
        connectionId: 1,
        connectinUserId: 1,
        platformName: 'STEAM',
        externalId: '12345',
        accessToken: 'mytoken',
      };

      mockConnectionsService.createConnection.mockResolvedValue(
        createdConnection,
      );

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;
      const body = {
        accessToken: 'mytoken',
        externalId: '12345',
        platformName: 'STEAM' as const,
      };

      await expect(
        controller.createConnection(mockRequest, body),
      ).resolves.toEqual(createdConnection);
      expect(mockConnectionsService.createConnection).toHaveBeenCalledWith(
        1,
        'mytoken',
        '12345',
        'STEAM',
      );
    });

    it('should create a connection without accessToken', async () => {
      const createdConnection = {
        connectionId: 2,
        connectinUserId: 1,
        platformName: 'RIOT',
        externalId: '67890',
      };

      mockConnectionsService.createConnection.mockResolvedValue(
        createdConnection,
      );

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;
      const body = { externalId: '67890', platformName: 'RIOT' as const };

      await expect(
        controller.createConnection(mockRequest, body),
      ).resolves.toEqual(createdConnection);
      expect(mockConnectionsService.createConnection).toHaveBeenCalledWith(
        1,
        undefined,
        '67890',
        'RIOT',
      );
    });
  });

  describe('deleteConnection', () => {
    it('should delete a connection and return it', async () => {
      const deletedConnection = {
        connectionId: 1,
        connectinUserId: 1,
        platformName: 'STEAM',
        externalId: '12345',
      };

      mockConnectionsService.deleteConnection.mockResolvedValue(
        deletedConnection,
      );

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(
        controller.deleteConnection(1, mockRequest),
      ).resolves.toEqual(deletedConnection);
      expect(mockConnectionsService.deleteConnection).toHaveBeenCalledWith(
        1,
        1,
      );
    });

    it('should propagate NotFoundException from service', async () => {
      mockConnectionsService.deleteConnection.mockRejectedValue(
        new NotFoundException('Connection not found.'),
      );

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(
        controller.deleteConnection(999, mockRequest),
      ).rejects.toThrow(NotFoundException);
      expect(mockConnectionsService.deleteConnection).toHaveBeenCalledWith(
        999,
        1,
      );
    });
  });
});
