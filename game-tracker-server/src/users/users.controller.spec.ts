import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import type { TRequestWithUser } from '../../utils/types/request.types.js';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    getById: jest.fn(),
    getByName: jest.fn(),
    editUser: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).overrideProvider(UsersService).useValue(mockUserService).overrideGuard(AuthGuard).useValue({ canActivate: () => true }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('should return the current user by userId from request', async () => {
      const testUser = {
        userId: 1,
        email: "test@test.test",
        username: "test",
      }

      mockUserService.getById.mockResolvedValue(testUser)

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser

      await expect(controller.getMe(mockRequest)).resolves.toEqual(testUser)
      expect(mockUserService.getById).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserService.getById.mockRejectedValue(new NotFoundException("User not found."))

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser

      await expect(controller.getMe(mockRequest)).rejects.toThrow(NotFoundException)
      expect(mockUserService.getById).toHaveBeenCalledWith(999)
    })
  })

  describe('getByName', () => {
    it('should return user by username', async () => {
      const testUser = {
        userId: 1,
        username: "test",
      }

      mockUserService.getByName.mockResolvedValue(testUser)

      await expect(controller.getByName("test")).resolves.toEqual(testUser)
      expect(mockUserService.getByName).toHaveBeenCalledWith("test")
    })

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserService.getByName.mockRejectedValue(new NotFoundException("User not found."))

      await expect(controller.getByName("nonexistent")).rejects.toThrow(NotFoundException)
      expect(mockUserService.getByName).toHaveBeenCalledWith("nonexistent")
    })
  })

  describe('getById', () => {
    it('should return user by id', async () => {
      const testUser = {
        userId: 1,
        email: "test@test.test",
        username: "test",
      }

      mockUserService.getById.mockResolvedValue(testUser)

      await expect(controller.getById(1)).resolves.toEqual(testUser)
      expect(mockUserService.getById).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserService.getById.mockRejectedValue(new NotFoundException("User not found."))

      await expect(controller.getById(999)).rejects.toThrow(NotFoundException)
      expect(mockUserService.getById).toHaveBeenCalledWith(999)
    })
  })

  describe('editUser', () => {
    it('should edit user email and username', async () => {
      const updatedUser = {
        userId: 1,
        email: "new@test.test",
        username: "newname",
      }

      mockUserService.editUser.mockResolvedValue(updatedUser)

      const body = { password: "Test12341234", email: "new@test.test", username: "newname" }

      await expect(controller.editUser(1, body)).resolves.toEqual(updatedUser)
      expect(mockUserService.editUser).toHaveBeenCalledWith(1, "Test12341234", "new@test.test", "newname")
    })

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserService.editUser.mockRejectedValue(new NotFoundException("User not found."))

      const body = { password: "Test12341234", email: "new@test.test", username: "newname" }

      await expect(controller.editUser(999, body)).rejects.toThrow(NotFoundException)
      expect(mockUserService.editUser).toHaveBeenCalledWith(999, "Test12341234", "new@test.test", "newname")
    })

    it('should throw UnauthorizedException if password is incorrect', async () => {
      mockUserService.editUser.mockRejectedValue(new UnauthorizedException("Incorrect password."))

      const body = { password: "WrongPass123", email: "new@test.test", username: "newname" }

      await expect(controller.editUser(1, body)).rejects.toThrow(UnauthorizedException)
      expect(mockUserService.editUser).toHaveBeenCalledWith(1, "WrongPass123", "new@test.test", "newname")
    })

    it('should pass undefined for optional fields', async () => {
      const updatedUser = {
        userId: 1,
        email: "test@test.test",
        username: "test",
      }

      mockUserService.editUser.mockResolvedValue(updatedUser)

      const body = { password: "Test12341234" } as any

      await expect(controller.editUser(1, body)).resolves.toEqual(updatedUser)
      expect(mockUserService.editUser).toHaveBeenCalledWith(1, "Test12341234", undefined, undefined)
    })
  })
});
