import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { PrismaService } from '../lib/prisma.service.js';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

const mockS3Send = jest.fn();
jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn().mockImplementation(() => ({
      send: mockS3Send,
    })),
    PutObjectCommand: jest
      .fn()
      .mockImplementation((args: Record<string, unknown>) => args),
  };
});

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    users: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockConfigService = {
    getOrThrow: jest.fn((key: string) => {
      switch (key) {
        case 'AWS_S3_REGION':
          return 'eu-north-1';
        case 'AWS_ACCESS_KEY':
          return 'test-access-key';
        case 'AWS_SECRET_KEY':
          return 'test-secret-key';
        default:
          return 'test-value';
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should throw NotFoundException if user is not exist', async () => {
      mockPrismaService.users.findUnique.mockResolvedValue(null);

      await expect(service.getById(1)).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.users.findUnique).toHaveBeenCalledWith({
        where: { userId: 1 },
        select: {
          userId: true,
          email: true,
          username: true,
          avatar: true,
        },
      });
    });

    it('should return user by id', async () => {
      const testUser = {
        userId: 1,
        email: 'test@test.test',
        username: 'test',
        avatar: 'https://avatar.url',
      };

      mockPrismaService.users.findUnique.mockResolvedValue(testUser);

      await expect(service.getById(1)).resolves.toEqual(testUser);
      expect(mockPrismaService.users.findUnique).toHaveBeenCalledWith({
        where: { userId: 1 },
        select: {
          userId: true,
          email: true,
          username: true,
          avatar: true,
        },
      });
    });
  });

  describe('getByName', () => {
    it('should throw NotFoundException if user is not exist', async () => {
      mockPrismaService.users.findFirst.mockResolvedValue(null);

      await expect(service.getByName('Test')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.users.findFirst).toHaveBeenCalledWith({
        where: { username: 'Test' },
        select: {
          userId: true,
          username: true,
        },
      });
    });

    it('should return user by username', async () => {
      const testUser = {
        userId: 1,
        username: 'test',
      };

      mockPrismaService.users.findFirst.mockResolvedValue(testUser);

      await expect(service.getByName('test')).resolves.toEqual(testUser);
      expect(mockPrismaService.users.findFirst).toHaveBeenCalledWith({
        where: { username: 'test' },
        select: {
          userId: true,
          username: true,
        },
      });
    });
  });

  describe('editUser', () => {
    it('should update user email and username', async () => {
      mockPrismaService.users.update.mockResolvedValue({
        userId: 1,
        email: 'new@test.test',
        username: 'newname',
      });

      const result = await service.editUser(1, 'new@test.test', 'newname');

      expect(result).toBeUndefined();
      expect(mockPrismaService.users.update).toHaveBeenCalledWith({
        where: { userId: 1 },
        data: {
          email: 'new@test.test',
          username: 'newname',
        },
      });
    });
  });

  describe('uploadAvatar', () => {
    it('should upload avatar to S3 and update user avatar in database', async () => {
      const fakeTime = 1700000000000;
      jest.spyOn(Date, 'now').mockReturnValue(fakeTime);

      mockS3Send.mockResolvedValue({});
      mockPrismaService.users.update.mockResolvedValue({});

      const fileBuffer = Buffer.from('fake image content');
      await service.uploadAvatar('avatar.png', fileBuffer, 'image/png', 1);

      expect(mockS3Send).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'game-tracker-avatars',
          Key: `${fakeTime}_avatar.png`,
          Body: fileBuffer,
          ContentType: 'image/png',
        }),
      );

      const expectedUrl = `https://game-tracker-avatars.s3.eu-north-1.amazonaws.com/${fakeTime}_avatar.png`;
      expect(mockPrismaService.users.update).toHaveBeenCalledWith({
        where: { userId: 1 },
        data: { avatar: expectedUrl },
      });
    });
  });
});
