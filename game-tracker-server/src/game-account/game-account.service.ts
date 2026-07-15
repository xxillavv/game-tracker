import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../lib/prisma.js';

@Injectable()
export class GameAccountService {
  async getUserAccounts(userId: number) {
    const accounts = await prisma.platformInfo.findMany({
      where: { platformUserId: userId },
      select: {
        platformId: true,
        platformName: true,
        externalId: true,
        accessToken: true
      }
    })

    return accounts
  }

  async createConnection(userId: number, accessToken: string | undefined, externalId: string, platformName: string) {
    const account = await prisma.platformInfo.create({
      data: {
        platformUserId: userId,
        platformName,
        externalId,
        accessToken
      }
    })

    return account
  }

  async deleteConnection(connectionId: number, userId: number) {
    return await prisma.$transaction(async (tx) => {
      const connection = await tx.platformInfo.findFirst({
        where: { platformId: connectionId, platformUserId: userId }
      })

      if (!connection) {
        throw new NotFoundException("Connection not found.");
      }

      return await tx.platformInfo.delete({
        where: { platformId: connectionId }
      })
    })
  }
}
