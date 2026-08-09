import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../lib/prisma.service.js';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly s3Client: S3Client;

  constructor(private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow("AWS_S3_REGION"),
      credentials: {
        accessKeyId: this.configService.getOrThrow("AWS_ACCESS_KEY"),
        secretAccessKey: this.configService.getOrThrow("AWS_SECRET_KEY")
      }
    });
  }

  async getById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { userId: id },
      select: {
        userId: true,
        email: true,
        username: true,
        avatar: true
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

    const isValidPassword = await bcrypt.compare(password, user.password)

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


  async uploadAvatar(fileName: string, file: Buffer, fileMimetype: string, userId: number) {
    const dateNow = Date.now()

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'game-tracker-avatars',
        Key: `${dateNow}_${fileName}`,
        Body: file,
        ContentType: fileMimetype
      })
    )

    const avatarUrl = `https://game-tracker-avatars.s3.eu-north-1.amazonaws.com/${dateNow}_${fileName}`

    await this.prisma.users.update({
      where: { userId: userId },
      data: { avatar: avatarUrl }
    })
  }
}
