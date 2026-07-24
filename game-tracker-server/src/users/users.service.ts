import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../lib/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { userId: id },
      select: {
        userId: true,
        email: true,
        username: true,
      }
    })

    if (!user) {
      throw new NotFoundException("User not found.")
    }

    return user
  }

  async getByName(name: string) {
    const user = await this.prisma.users.findFirst({
      where: { username: name },
      select: {
        userId: true,
        username: true
      }
    })

    if (!user) {
      throw new NotFoundException("User not found.")
    }

    return user
  }

  async editUser(id, password, email, username) {
    const user = await this.prisma.users.findUnique({
      where: { userId: id }
    })

    if (!user) {
      throw new NotFoundException("User not found.")
    }

    const isValidPassword = bcrypt.compare(user.password, password)

    if (!isValidPassword) {
      throw new UnauthorizedException("Incorrect password.")
    }

    const newUser = await this.prisma.users.update({
      where: { userId: id },
      data: {
        email,
        username
      },
      select: {
        userId: true,
        email: true,
        username: true

      }
    })

    return newUser
  }
}
