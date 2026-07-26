import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { PrismaService } from '../lib/prisma.service.js';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt');


describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    users: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).overrideProvider(PrismaService).useValue(mockPrismaService).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getById', () => {
    it('should throw NotFoundException if user is not exist', async () => {
      mockPrismaService.users.findUnique.mockResolvedValue(null)

      await expect(service.getById(1)).rejects.toThrow(NotFoundException)
    })

    it('should return user by id', async () => {
      const testUser = {
        userId: 1,
        email: "test@test.test",
        username: "test",
      }

      mockPrismaService.users.findUnique.mockResolvedValue(testUser)

      await expect(service.getById(1)).resolves.toEqual(testUser)
    })
  })


  describe('getByName', () => {
    it('should throw NotFoundException if user is not exist', async () => {
      mockPrismaService.users.findFirst.mockResolvedValue(null)

      await expect(service.getByName("Test")).rejects.toThrow(NotFoundException)
    })

    it('should return user by username', async () => {
      const testUser = {
        userId: 1,
        username: "test",
      }

      mockPrismaService.users.findFirst.mockResolvedValue(testUser)

      await expect(service.getByName("test")).resolves.toEqual(testUser)
    })
  })


  describe('editUser', () => {
    it('should throw NotFoundException if user is not exist', async () => {
      mockPrismaService.users.findUnique.mockResolvedValue(null)

      await expect(service.editUser(1, "Test12341234", "test@test.test", "test")).rejects.toThrow(NotFoundException)
    })

    it('should throw UnauthorizedException if user password is not valid', async () => {
      const testUser = {
        userId: 1,
        email: "test@example.com",
        username: "testuser",
        password: "$2b$10$hashedpasswordexample123456789",
        createdAt: new Date("2026-01-01T12:00:00.000Z"),
        updatedAt: new Date("2026-07-25T15:00:00.000Z"),
      };

      mockPrismaService.users.findUnique.mockResolvedValue(testUser);

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.editUser(1, "Test12341234", "test@test.test", "test")).rejects.toThrow(UnauthorizedException)
    })

    it('should edit user email and username', async () => {
      const testUser = {
        userId: 1,
        email: "test@example.com",
        username: "testuser",
        password: "$2b$10$hashedpasswordexample123456789",
        createdAt: new Date("2026-01-01T12:00:00.000Z"),
        updatedAt: new Date("2026-07-25T15:00:00.000Z"),
      };

      mockPrismaService.users.findUnique.mockResolvedValue(testUser);

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const newTestUser = {
        userId: 1,
        email: "testtest@example.com",
        username: "test123",
      };

      mockPrismaService.users.update.mockResolvedValue(newTestUser);

      await expect(
        service.editUser(1, "Test12341234", "testtest@example.com", "test123")
      ).resolves.toEqual(newTestUser);
    })
  })
});
