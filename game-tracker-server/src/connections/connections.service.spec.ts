import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsService } from './connections.service.js';
import { PrismaService } from '../lib/prisma.service.js';
import { NotFoundException } from '@nestjs/common';

describe('ConnectionsService', () => {
  let service: ConnectionsService;

  const tx = {
    connections: {
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockPrismaService = {
    connections: {
      findMany: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
    },
    $transaction: jest.fn((callback: (txArg: typeof tx) => unknown) =>
      callback(tx),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<ConnectionsService>(ConnectionsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserConnectios', () => {
    it('should return all connections for a user', async () => {
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

      mockPrismaService.connections.findMany.mockResolvedValue(connections);

      const result = await service.getUserConnectios(1);

      expect(result).toEqual(connections);
      expect(mockPrismaService.connections.findMany).toHaveBeenCalledWith({
        where: { connectinUserId: 1 },
        select: {
          connectionId: true,
          platformName: true,
          externalId: true,
          accessToken: true,
        },
      });
    });

    it('should return empty array when user has no connections', async () => {
      mockPrismaService.connections.findMany.mockResolvedValue([]);

      const result = await service.getUserConnectios(999);

      expect(result).toEqual([]);
    });
  });

  describe('createConnection', () => {
    it('should create a connection with accessToken', async () => {
      const createdConnection = {
        connectionId: 1,
        connectinUserId: 1,
        platformName: 'STEAM',
        externalId: '12345',
        accessToken: 'mytoken',
      };

      mockPrismaService.connections.create.mockResolvedValue(createdConnection);

      const result = await service.createConnection(
        1,
        'mytoken',
        '12345',
        'STEAM',
      );

      expect(result).toEqual(createdConnection);
      expect(mockPrismaService.connections.create).toHaveBeenCalledWith({
        data: {
          connectinUserId: 1,
          platformName: 'STEAM',
          externalId: '12345',
          accessToken: 'mytoken',
        },
      });
    });

    it('should create a connection without accessToken', async () => {
      const createdConnection = {
        connectionId: 2,
        connectinUserId: 1,
        platformName: 'RIOT',
        externalId: '67890',
        accessToken: undefined,
      };

      mockPrismaService.connections.create.mockResolvedValue(createdConnection);

      const result = await service.createConnection(
        1,
        undefined,
        '67890',
        'RIOT',
      );

      expect(result).toEqual(createdConnection);
      expect(mockPrismaService.connections.create).toHaveBeenCalledWith({
        data: {
          connectinUserId: 1,
          platformName: 'RIOT',
          externalId: '67890',
          accessToken: undefined,
        },
      });
    });
  });

  describe('deleteConnection', () => {
    it('should delete connection when it belongs to the user', async () => {
      const connection = {
        connectionId: 1,
        connectinUserId: 1,
        platformName: 'STEAM',
        externalId: '12345',
      };

      tx.connections.findFirst.mockResolvedValue(connection);

      const deletedConnection = { ...connection };
      tx.connections.delete.mockResolvedValue(deletedConnection);

      const result = await service.deleteConnection(1, 1);

      expect(result).toEqual(deletedConnection);
      expect(tx.connections.findFirst).toHaveBeenCalledWith({
        where: { connectionId: 1, connectinUserId: 1 },
      });
      expect(tx.connections.delete).toHaveBeenCalledWith({
        where: { connectionId: 1 },
      });
    });

    it('should throw NotFoundException when connection does not exist', async () => {
      tx.connections.findFirst.mockResolvedValue(null);

      await expect(service.deleteConnection(999, 1)).rejects.toThrow(
        NotFoundException,
      );
      expect(tx.connections.delete).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when connection belongs to another user', async () => {
      tx.connections.findFirst.mockResolvedValue(null);

      await expect(service.deleteConnection(1, 999)).rejects.toThrow(
        NotFoundException,
      );
      expect(tx.connections.delete).not.toHaveBeenCalled();
    });
  });
});
