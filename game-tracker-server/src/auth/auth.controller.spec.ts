import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    registerUser: jest.fn(),
    loginUser: jest.fn(),
    refreshToken: jest.fn(),
    logoutUser: jest.fn(),
  }

  const mockResponse = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  } as unknown as Response

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register user, set cookie, and return user without password', async () => {
      const serviceResult = {
        accessToken: "accessToken123",
        user: { userId: 1, email: "test@test.test", username: "testuser" }
      }
      mockAuthService.registerUser.mockResolvedValue(serviceResult)

      const body = { username: "testuser", email: "test@test.test", password: "Test12341234" }

      const result = await controller.registerUser(body, mockResponse)

      expect(result).toEqual({ userId: 1, email: "test@test.test", username: "testuser" })
      expect(mockAuthService.registerUser).toHaveBeenCalledWith("testuser", "test@test.test", "Test12341234")
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'accessToken',
        'accessToken123',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          secure: true
        })
      )
    })

    it('should propagate ConflictException from service', async () => {
      mockAuthService.registerUser.mockRejectedValue(new ConflictException("User with this email already exists"))

      const body = { username: "testuser", email: "test@test.test", password: "Test12341234" }

      await expect(controller.registerUser(body, mockResponse)).rejects.toThrow(ConflictException)
    })
  })

  describe('loginUser', () => {
    it('should login user, set cookie, and return user without password', async () => {
      const serviceResult = {
        accessToken: "accessToken123",
        user: { userId: 1, email: "test@test.test", username: "testuser" }
      }
      mockAuthService.loginUser.mockResolvedValue(serviceResult)

      const body = { email: "test@test.test", password: "Test12341234" }

      const result = await controller.loginUser(body, mockResponse)

      expect(result).toEqual({ userId: 1, email: "test@test.test", username: "testuser" })
      expect(mockAuthService.loginUser).toHaveBeenCalledWith("test@test.test", "Test12341234")
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'accessToken',
        'accessToken123',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          secure: true
        })
      )
    })

    it('should propagate UnauthorizedException for wrong credentials', async () => {
      mockAuthService.loginUser.mockRejectedValue(new UnauthorizedException("Incorrect email or password."))

      const body = { email: "wrong@test.test", password: "WrongPass123" }

      await expect(controller.loginUser(body, mockResponse)).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('refreshToken', () => {
    it('should refresh token and set new cookie', async () => {
      const mockRequest = {
        cookies: { accessToken: "oldAccessToken" }
      } as unknown as Request

      mockAuthService.refreshToken.mockResolvedValue({ newAccessToken: "newAccessToken123" })

      await controller.refreshToken(mockRequest, mockResponse)

      expect(mockAuthService.refreshToken).toHaveBeenCalledWith("oldAccessToken")
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'accessToken',
        'newAccessToken123',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          secure: true
        })
      )
    })

    it('should propagate UnauthorizedException for invalid token', async () => {
      const mockRequest = {
        cookies: { accessToken: "invalidToken" }
      } as unknown as Request

      mockAuthService.refreshToken.mockRejectedValue(new UnauthorizedException("Invalid token."))

      await expect(controller.refreshToken(mockRequest, mockResponse)).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('logoutUser', () => {
    it('should clear cookie, call logoutUser on service and return message', async () => {
      const serviceResult = { message: "Logged out successfully!" }
      mockAuthService.logoutUser.mockResolvedValue(serviceResult)

      const mockRequest = {
        user: { userId: 1 }
      } as TRequestWithUser

      const result = await controller.logoutUser(mockResponse, mockRequest)

      expect(mockResponse.clearCookie).toHaveBeenCalledWith(
        'accessToken',
        expect.objectContaining({
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
        })
      )
      expect(mockAuthService.logoutUser).toHaveBeenCalledWith(1)
      expect(result).toEqual(serviceResult)
    })
  })
});
