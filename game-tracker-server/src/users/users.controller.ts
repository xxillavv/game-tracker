import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';
import { EditUserDto } from '../../utils/dto/users.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() request: TRequestWithUser) {
    return this.usersService.getById(request.user.userId)
  }

  @Get()
  getByName(@Query('search') query: string) {
    return this.usersService.getByName(query)
  }

  @Get(":id")
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id)
  }

  @Patch(":id")
  editUser(@Param('id', ParseIntPipe) id: number, @Body() body: EditUserDto) {
    return this.usersService.editUser(id, body.password, body.email, body.username)
  }

  @Post("avatar")
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/i })
      ]
    })
  ) file: Express.Multer.File) {
    return this.usersService.uploadAvatar(file.originalname, file.buffer)
  }
}
