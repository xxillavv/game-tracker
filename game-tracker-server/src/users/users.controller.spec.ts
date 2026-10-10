import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { NotFoundException } from '@nestjs/common';
import type { TRequestWithUser } from '../../utils/types/request.types.js';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    getById: jest.fn(),
    getByName: jest.fn(),
    editUser: jest.fn(),
    uploadAvatar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('should return the current user by userId from request', async () => {
      const testUser = {
        userId: 1,
        email: 'test@test.test',
        username: 'test',
      };

      mockUserService.getById.mockResolvedValue(testUser);

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(controller.getMe(mockRequest)).resolves.toEqual(testUser);
      expect(mockUserService.getById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserService.getById.mockRejectedValue(
        new NotFoundException('User not found.'),
      );

      const mockRequest = { user: { userId: 999 } } as TRequestWithUser;

      await expect(controller.getMe(mockRequest)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserService.getById).toHaveBeenCalledWith(999);
    });
  });

  describe('getByName', () => {
    it('should return user by username', async () => {
      const testUser = {
        userId: 1,
        username: 'test',
      };

      mockUserService.getByName.mockResolvedValue(testUser);

      await expect(controller.getByName('test')).resolves.toEqual(testUser);
      expect(mockUserService.getByName).toHaveBeenCalledWith('test');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserService.getByName.mockRejectedValue(
        new NotFoundException('User not found.'),
      );

      await expect(controller.getByName('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserService.getByName).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      const testUser = {
        userId: 1,
        email: 'test@test.test',
        username: 'test',
      };

      mockUserService.getById.mockResolvedValue(testUser);

      await expect(controller.getById(1)).resolves.toEqual(testUser);
      expect(mockUserService.getById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserService.getById.mockRejectedValue(
        new NotFoundException('User not found.'),
      );

      await expect(controller.getById(999)).rejects.toThrow(NotFoundException);
      expect(mockUserService.getById).toHaveBeenCalledWith(999);
    });
  });

  describe('editUser', () => {
    it('should edit user email and username', async () => {
      mockUserService.editUser.mockResolvedValue(undefined);

      const body = { email: 'new@test.test', username: 'newname' };
      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;

      await expect(
        controller.editUser(body, mockRequest),
      ).resolves.toBeUndefined();
      expect(mockUserService.editUser).toHaveBeenCalledWith(
        1,
        'new@test.test',
        'newname',
      );
    });

    it('should propagate errors from service', async () => {
      mockUserService.editUser.mockRejectedValue(
        new NotFoundException('User not found.'),
      );

      const body = { email: 'new@test.test', username: 'newname' };
      const mockRequest = { user: { userId: 999 } } as TRequestWithUser;

      await expect(controller.editUser(body, mockRequest)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserService.editUser).toHaveBeenCalledWith(
        999,
        'new@test.test',
        'newname',
      );
    });
  });

  describe('uploadAvatar', () => {
    it('should upload avatar for current user', async () => {
      mockUserService.uploadAvatar.mockResolvedValue(undefined);

      const mockRequest = { user: { userId: 1 } } as TRequestWithUser;
      const mockFile = {
        originalname: 'avatar.png',
        buffer: Buffer.from('image content'),
        mimetype: 'image/png',
      } as Express.Multer.File;

      await expect(
        controller.uploadAvatar(mockRequest, mockFile),
      ).resolves.toBeUndefined();
      expect(mockUserService.uploadAvatar).toHaveBeenCalledWith(
        'avatar.png',
        mockFile.buffer,
        'image/png',
        1,
      );
    });
  });
});
