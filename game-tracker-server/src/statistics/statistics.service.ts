import { Injectable, NotFoundException } from '@nestjs/common';
import { DotaProvider } from '../providers/dota-api.service.js';
import { prisma } from '../../lib/prisma.js';

@Injectable()
export class StatisticsService {
  constructor(private readonly dotaProvider: DotaProvider) { }

  async getDotaProfile(userId: number) {
    const cachedStats = await prisma.gameStats.findFirst({
      where: { connections: { connectinUserId: userId } }
    });

    if (!cachedStats) {
      return await this.syncDotaStats(userId)
    }

    return cachedStats
  }

  async syncDotaStats(userId: number) {
    const userInfo = await prisma.connections.findFirstOrThrow({
      where: { connectinUserId: userId },
      select: { externalId: true, connectionId: true }
    });

    const stats = await this.dotaProvider.getPlayerStats(userInfo.externalId);
    const winrate = await this.dotaProvider.getPlayerWinrate(userInfo.externalId);

    return await prisma.gameStats.upsert({
      where: { statsConnectionId: userInfo.connectionId },
      update: {
        metadata: {
          accountId: stats.profile.account_id,
          name: stats.profile.personaname,
          rank: stats.rank_tier,
          matchesWin: winrate.win,
          matchesLose: winrate.lose,
          dotaPlus: stats.profile.plus,
        }
      },
      create: {
        statsConnectionId: userInfo.connectionId,
        metadata: {
          accountId: stats.profile.account_id,
          name: stats.profile.personaname,
          rank: stats.rank_tier,
          matchesWin: winrate.win,
          matchesLose: winrate.lose,
          dotaPlus: stats.profile.plus,
        }
      }
    });
  }


  async getDotaRatings(userId: number) {
    const cachedRatings = await prisma.ratingHistory.findMany({
      where: {
        gameStats: { connections: { connectinUserId: userId } }
      },
      orderBy: { achievedAt: 'desc' }
    });


    if (cachedRatings.length === 0) {
      await this.syncDotaRatings(userId);

      return await prisma.ratingHistory.findMany({
        where: { gameStats: { connections: { connectinUserId: userId } } },
        orderBy: { achievedAt: 'desc' }
      });
    }

    return cachedRatings;
  }

  async syncDotaRatings(userId: number) {
    const userInfo = await prisma.connections.findFirstOrThrow({
      where: { connectinUserId: userId },
      select: {
        externalId: true,
        gameStats: { select: { statId: true } }
      }
    });

    if (!userInfo.gameStats) throw new NotFoundException("Game stats not found");

    const ratingsList = await this.dotaProvider.getPlayerRatings(userInfo.externalId);

    const dataToInsert = ratingsList.map((r) => ({
      ratingStatId: userInfo.gameStats!.statId,
      achievedAt: new Date(r.time),
      ratingTier: r.rank_tier
    }));

    await prisma.$transaction([
      prisma.ratingHistory.deleteMany({
        where: { ratingStatId: userInfo.gameStats.statId }
      }),

      prisma.ratingHistory.createMany({
        data: dataToInsert
      })
    ]);
  }
}
