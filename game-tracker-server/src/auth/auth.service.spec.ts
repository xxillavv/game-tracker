import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.js';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../lib/prisma.service.js';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
    decode: jest.fn(),
  };

  const mockPrismaService = {
    users: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },

    sessions: {
      create: jest.fn(),
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a new user and return accessToken and user', async () => {
      mockPrismaService.users.findFirst.mockResolvedValue(null)

      ;(bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123")

      const createdUser = {
        userId: 1,
        email: "test@test.test",
        username: "testuser",
        password: "hashedPassword123"
      }
      mockPrismaService.users.create.mockResolvedValue(createdUser)

      mockJwtService.signAsync
        .mockResolvedValueOnce("refreshToken123")
        .mockResolvedValueOnce("accessToken123")

      mockPrismaService.sessions.create.mockResolvedValue({})

      const result = await service.registerUser("testuser", "test@test.test", "Test12341234")

      expect(result).toEqual({
        accessToken: "accessToken123",
        user: { userId: 1, email: "test@test.test", username: "testuser" }
      })
      expect(mockPrismaService.users.findFirst).toHaveBeenCalledWith({
        where: { email: "test@test.test" }
      })
      expect(bcrypt.hash).toHaveBeenCalledWith("Test12341234", 10)
      expect(mockPrismaService.sessions.create).toHaveBeenCalledWith({
        data: { token: "refreshToken123", sessionUserId: 1 }
      })
    })

    it('should throw ConflictException if email already exists', async () => {
      mockPrismaService.users.findFirst.mockResolvedValue({ userId: 1, email: "test@test.test" })

      await expect(service.registerUser("testuser", "test@test.test", "Test12341234"))
        .rejects.toThrow(ConflictException)

      expect(mockPrismaService.users.create).not.toHaveBeenCalled()
    })
  })

  describe('loginUser', () => {
    it('should login user and return accessToken and user', async () => {
      const user = {
        userId: 1,
        email: "test@test.test",
        username: "testuser",
        password: "hashedPassword123"
      }
      mockPrismaService.users.findUnique.mockResolvedValue(user)

      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

      mockJwtService.signAsync
        .mockResolvedValueOnce("accessToken123")
        .mockResolvedValueOnce("refreshToken123")

      mockPrismaService.sessions.upsert.mockResolvedValue({})

      const result = await service.loginUser("test@test.test", "Test12341234")

      expect(result).toEqual({
        accessToken: "accessToken123",
        user: { userId: 1, email: "test@test.test", username: "testuser" }
      })
      expect(mockPrismaService.users.findUnique).toHaveBeenCalledWith({
        where: { email: "test@test.test" },
        select: { userId: true, password: true, email: true, username: true }
      })
      expect(bcrypt.compare).toHaveBeenCalledWith("Test12341234", "hashedPassword123")
      expect(mockPrismaService.sessions.upsert).toHaveBeenCalledWith({
        where: { sessionUserId: 1 },
        update: { token: "refreshToken123" },
        create: { sessionUserId: 1, token: "refreshToken123" }
      })
    })

    it('should throw UnauthorizedException if user is not found', async () => {
      mockPrismaService.users.findUnique.mockResolvedValue(null)

      await expect(service.loginUser("wrong@test.test", "Test12341234"))
        .rejects.toThrow(UnauthorizedException)
    })

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const user = {
        userId: 1,
        email: "test@test.test",
        username: "testuser",
        password: "hashedPassword123"
      }
      mockPrismaService.users.findUnique.mockResolvedValue(user)

      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      await expect(service.loginUser("test@test.test", "WrongPass123"))
        .rejects.toThrow(UnauthorizedException)
    })
  })

  describe('refreshToken', () => {
    it('should refresh tokens and return new access token', async () => {
      mockJwtService.decode.mockReturnValue({ sub: "1", email: "test@test.test" })

      const userData = {
        email: "test@test.test",
        sessions: { token: "oldRefreshToken" }
      }
      mockPrismaService.users.findUnique.mockResolvedValue(userData)

      mockJwtService.verifyAsync.mockResolvedValue({ sub: 1 })

      mockJwtService.signAsync
        .mockResolvedValueOnce("newRefreshToken")
        .mockResolvedValueOnce("newAccessToken")

      mockPrismaService.sessions.upsert.mockResolvedValue({})

      const result = await service.refreshToken("oldAccessToken")

      expect(result).toEqual({ newAccessToken: "newAccessToken" })
      expect(mockJwtService.decode).toHaveBeenCalledWith("oldAccessToken")
      expect(mockPrismaService.users.findUnique).toHaveBeenCalledWith({
        where: { userId: 1 },
        select: {
          email: true,
          sessions: { select: { token: true } }
        }
      })
      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith("oldRefreshToken")
    })

    it('should throw UnauthorizedException if payload is invalid', async () => {
      mockJwtService.decode.mockReturnValue(null)

      await expect(service.refreshToken("invalidToken"))
        .rejects.toThrow()
    })

    it('should throw UnauthorizedException if user is not found', async () => {
      mockJwtService.decode.mockReturnValue({ sub: "999" })

      mockPrismaService.users.findUnique.mockResolvedValue(null)

      await expect(service.refreshToken("someToken"))
        .rejects.toThrow(UnauthorizedException)
    })

    it('should throw UnauthorizedException if session does not exist', async () => {
      mockJwtService.decode.mockReturnValue({ sub: "1" })

      mockPrismaService.users.findUnique.mockResolvedValue({
        email: "test@test.test",
        sessions: null
      })

      await expect(service.refreshToken("someToken"))
        .rejects.toThrow(UnauthorizedException)
    })

    it('should throw UnauthorizedException if refresh token is expired', async () => {
      mockJwtService.decode.mockReturnValue({ sub: "1" })

      mockPrismaService.users.findUnique.mockResolvedValue({
        email: "test@test.test",
        sessions: { token: "expiredRefreshToken" }
      })

      mockJwtService.verifyAsync.mockRejectedValue(new Error("jwt expired"))

      await expect(service.refreshToken("someToken"))
        .rejects.toThrow()
    })
  })
});
