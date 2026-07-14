import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../types/request.types.js';
import { EditUserDto } from '../dto/users.dto.js';

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
    console.log(query)
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
}
