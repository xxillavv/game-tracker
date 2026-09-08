import { Injectable, NotFoundException } from '@nestjs/common';
import { PlatformNameEmun } from '../../generated/prisma/enums.js';
import { PrismaService } from '../lib/prisma.service.js';

@Injectable()
export class ConnectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserConnectios(userId: number) {
    const accounts = await this.prisma.connections.findMany({
      where: { connectinUserId: userId },
      select: {
        connectionId: true,
        platformName: true,
        externalId: true,
        accessToken: true,
      },
    });

    return accounts;
  }

  async createConnection(
    userId: number,
    accessToken: string | undefined,
    externalId: string,
    platformName: PlatformNameEmun,
  ) {
    const account = await this.prisma.connections.create({
      data: {
        connectinUserId: userId,
        platformName,
        externalId,
        accessToken,
      },
    });

    return account;
  }

  async deleteConnection(connectionId: number, userId: number) {
    return await this.prisma.$transaction(async (tx) => {
      const connection = await tx.connections.findFirst({
        where: { connectionId, connectinUserId: userId },
      });

      if (!connection) {
        throw new NotFoundException('Connection not found.');
      }

      return await tx.connections.delete({
        where: { connectionId },
      });
    });
  }
}
