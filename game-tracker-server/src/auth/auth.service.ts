import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../../lib/prisma.js';
import * as bcrypt from 'bcrypt'
import { response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) { }

  private salt = 10

  async registerUser(username: string, userEmail: string, password: string) {
    const isExist = await prisma.user.findFirst({
      where: { email: userEmail }
    })

    if (isExist) throw new ConflictException("User with this email already exists")

    const hashPassword = await bcrypt.hash(password, this.salt)

    const user = await prisma.user.create({
      data: {
        email: userEmail,
        username,
        password: hashPassword
      },
      select: {
        userId: true,
        password: true,
        email: true,
        username: true,
      }
    })

    const refreshPayload = {
      sub: user.userId
    }

    const refreshToken = await this.jwt.signAsync(refreshPayload, { expiresIn: '7d' })

    await prisma.session.create({
      data: {
        token: refreshToken,
        sessionUserId: user.userId
      }
    })

    const accessPayload = {
      sub: user.userId,
      email: user.email
    }

    const accessToken = await this.jwt.signAsync(accessPayload)

    return { accessToken, user }
  }

  async loginUser(userRmail: string, userPassword: string) {
    const user = await prisma.user.findUnique({
      where: { email: userRmail },
      select: {
        userId: true,
        password: true,
        email: true,
        username: true,
      }
    })

    if (!user) {
      throw new UnauthorizedException('Incorrect login or password.')
    }

    const isPasswordExist = await bcrypt.compare(userPassword, user!.password)

    if (!isPasswordExist) {
      throw new UnauthorizedException('Incorrect login or password.')
    }

    const accessPayload = {
      sub: user.userId,
      email: user.email
    }

    const refreshPayload = {
      sub: user.userId
    }

    const accessToken = await this.jwt.signAsync(accessPayload)
    const refreshToken = await this.jwt.signAsync(refreshPayload, { expiresIn: '7d' })


    try {
      await prisma.$transaction([
        prisma.session.deleteMany({
          where: { sessionUserId: user.userId }
        }),

        prisma.session.create({
          data: {
            token: refreshToken,
            sessionUserId: user.userId
          }
        })
      ])
    } catch {
      throw new InternalServerErrorException("Failed to update current session.")
    }


    const { password, ...userResponse } = user

    return { accessToken, user: userResponse }
  }
}
