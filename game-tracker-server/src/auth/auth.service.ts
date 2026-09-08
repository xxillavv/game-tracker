import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../lib/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  private salt = 10;

  async registerUser(
    username: string,
    userEmail: string,
    userPassword: string,
  ) {
    const isExist = await this.prisma.users.findFirst({
      where: { email: userEmail },
    });

    if (isExist)
      throw new ConflictException('User with this email already exists');

    const hashPassword = await bcrypt.hash(userPassword, this.salt);

    const user = await this.prisma.users.create({
      data: {
        email: userEmail,
        username,
        password: hashPassword,
      },
      select: {
        userId: true,
        password: true,
        email: true,
        username: true,
      },
    });

    const refreshPayload = {
      sub: user.userId,
    };

    const refreshToken = await this.jwt.signAsync(refreshPayload, {
      expiresIn: '7d',
    });

    await this.prisma.sessions.create({
      data: {
        token: refreshToken,
        sessionUserId: user.userId,
      },
    });

    const accessPayload = {
      sub: user.userId,
      email: user.email,
    };

    const accessToken = await this.jwt.signAsync(accessPayload);

    const { password: _password, ...userWithoutPassword } = user;
    void _password;

    return { accessToken, user: userWithoutPassword };
  }

  async loginUser(userRmail: string, userPassword: string) {
    const user = await this.prisma.users.findUnique({
      where: { email: userRmail },
      select: {
        userId: true,
        password: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const isPasswordExist = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordExist) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const accessPayload = {
      sub: user.userId,
      email: user.email,
    };

    const refreshPayload = {
      sub: user.userId,
    };

    const accessToken = await this.jwt.signAsync(accessPayload);
    const refreshToken = await this.jwt.signAsync(refreshPayload, {
      expiresIn: '7d',
    });

    await this.prisma.sessions.upsert({
      where: { sessionUserId: user.userId },
      update: {
        token: refreshToken,
      },
      create: {
        sessionUserId: user.userId,
        token: refreshToken,
      },
    });

    const { password: _password, ...userResponse } = user;
    void _password;

    return { accessToken, user: userResponse };
  }

  async refreshToken(token: string) {
    const rawPayload: unknown = this.jwt.decode(token);
    const payload = rawPayload as { sub?: string | number } | null | undefined;
    const userId =
      payload && typeof payload === 'object' && 'sub' in payload
        ? Number(payload.sub)
        : NaN;

    if (!payload || isNaN(userId)) {
      throw new UnauthorizedException('Invalid token.');
    }

    const userData = await this.prisma.users.findUnique({
      where: { userId },
      select: {
        email: true,
        sessions: {
          select: {
            token: true,
          },
        },
      },
    });

    if (!userData || !userData.sessions) {
      throw new UnauthorizedException('Token is not valid.');
    }

    const refreshPayload = await this.jwt.verifyAsync<Record<string, unknown>>(
      userData.sessions.token,
    );

    if (!refreshPayload) {
      throw new UnauthorizedException('Refresh token is expired.');
    }

    const { exp: _exp, iat: _iat, ...cleanPayload } = refreshPayload;
    void _exp;
    void _iat;

    const newRefreshToken = await this.jwt.signAsync(cleanPayload, {
      expiresIn: '7d',
    });

    await this.prisma.sessions.upsert({
      where: { sessionUserId: userId },
      update: {
        token: newRefreshToken,
      },
      create: {
        sessionUserId: userId,
        token: newRefreshToken,
      },
    });

    const newAccessToken = await this.jwt.signAsync({
      sub: userId,
      email: userData.email,
    });

    return { newAccessToken };
  }

  async logoutUser(userId: number) {
    await this.prisma.sessions.deleteMany({
      where: { sessionUserId: userId },
    });

    return { message: 'Logged out successfully!' };
  }
}
