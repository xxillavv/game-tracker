import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { prisma } from '../../lib/prisma.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async getById(id: number) {

    console.log(id)

    const user = await prisma.users.findUnique({
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

    return { user }
  }

  async getByName(name: string) {
    const user = await prisma.users.findFirst({
      where: { username: name },
      select: {
        userId: true,
        username: true
      }
    })

    if (!user) {
      throw new NotFoundException("User not found.")
    }

    return { user }
  }

  async editUser(id, password, email, username) {
    const user = await prisma.users.findUnique({
      where: { userId: id }
    })

    if (!user) {
      throw new NotFoundException("User not found.")
    }

    const isValidPassword = bcrypt.compare(user.password, password)

    if (!isValidPassword) {
      throw new UnauthorizedException("Incorrect password.")
    }

    const newUser = await prisma.users.update({
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

    return { newUser }
  }
}
