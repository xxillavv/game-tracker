import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../lib/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) { }
  private salt = 10

  async registerUser(username: string, userEmail: string, userPassword: string) {
    const isExist = await this.prisma.users.findFirst({
      where: { email: userEmail }
    })

    if (isExist) throw new ConflictException("User with this email already exists")

    const hashPassword = await bcrypt.hash(userPassword, this.salt)

    const user = await this.prisma.users.create({
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

    await this.prisma.sessions.create({
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

    const { password, ...userWithoutPassword } = user

    return { accessToken, user: userWithoutPassword }
  }


  async loginUser(userRmail: string, userPassword: string) {
    const user = await this.prisma.users.findUnique({
      where: { email: userRmail },
      select: {
        userId: true,
        password: true,
        email: true,
        username: true,
      }
    })

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.')
    }

    const isPasswordExist = await bcrypt.compare(userPassword, user!.password)

    if (!isPasswordExist) {
      throw new UnauthorizedException('Incorrect email or password.')
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

    await this.prisma.sessions.upsert({
      where: { sessionUserId: user.userId },
      update: {
        token: refreshToken
      },
      create: {
        sessionUserId: user.userId,
        token: refreshToken
      }
    })

    const { password, ...userResponse } = user

    return { accessToken, user: userResponse }
  }


  async refreshToken(token: string) {
    const payload = await this.jwt.decode(token)
    const userId = +payload.sub

    if (!payload || isNaN(userId)) {
      throw new UnauthorizedException("Invalid token.")
    }

    const userData = await this.prisma.users.findUnique({
      where: { userId },
      select: {
        email: true,
        sessions: {
          select: {
            token: true
          }
        }
      }
    })

    if (!userData || !userData.sessions) {
      throw new UnauthorizedException("Token is not valid.")
    }

    const refreshPayload = await this.jwt.verifyAsync(userData.sessions.token)

    if (!refreshPayload) {
      throw new UnauthorizedException("Refresh token is expired.")
    }

    const newRefreshToken = await this.jwt.signAsync(refreshPayload)

    await this.prisma.sessions.upsert({
      where: { sessionUserId: userId },
      update: {
        token: newRefreshToken
      },
      create: {
        sessionUserId: userId,
        token: newRefreshToken
      }
    })

    const newAccessToken = await this.jwt.signAsync({ sub: userId, email: userData.email })

    return { newAccessToken }
  }
}
