import { Injectable, NotFoundException } from '@nestjs/common';
import { DotaProvider } from '../providers/dota-api.service.js';
import { prisma } from '../../lib/prisma.js';

@Injectable()
export class StatisticsService {
  constructor(private readonly dotaProvider: DotaProvider) { }

  async getDotaProfile(userId: number) {
    const cachedStats = await prisma.gameStats.findFirst({
      where: { platform: { platformUserId: userId } }
    });

    if (!cachedStats) {
      return await this.syncDotaStats(userId)
    }

    return cachedStats
  }

  async syncDotaStats(userId: number) {
    const userInfo = await prisma.platformInfo.findFirstOrThrow({
      where: { platformUserId: userId },
      select: { externalId: true, platformId: true }
    });

    const stats = await this.dotaProvider.getPlayerStats(userInfo.externalId);
    const winrate = await this.dotaProvider.getPlayerWinrate(userInfo.externalId);

    return await prisma.gameStats.upsert({
      where: { platformId: userInfo.platformId },
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
        platformId: userInfo.platformId,
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
    const cachedRatings = await prisma.rankHistory.findMany({
      where: {
        gameStats: { platform: { platformUserId: userId } }
      },
      orderBy: { achivedAt: 'desc' }
    });


    if (cachedRatings.length === 0) {
      await this.syncDotaRatings(userId);

      return await prisma.rankHistory.findMany({
        where: { gameStats: { platform: { platformUserId: userId } } },
        orderBy: { achivedAt: 'desc' }
      });
    }

    return cachedRatings;
  }

  async syncDotaRatings(userId: number) {
    const userInfo = await prisma.platformInfo.findFirstOrThrow({
      where: { platformUserId: userId },
      select: {
        externalId: true,
        gameStats: { select: { statId: true } }
      }
    });

    if (!userInfo.gameStats) throw new NotFoundException("Game stats not found");

    const ratingsList = await this.dotaProvider.getPlayerRatings(userInfo.externalId);

    const dataToInsert = ratingsList.map((r) => ({
      statId: userInfo.gameStats!.statId,
      achivedAt: new Date(r.time),
      rankTier: r.rank_tier
    }));

    await prisma.$transaction([
      prisma.rankHistory.deleteMany({
        where: { statId: userInfo.gameStats.statId }
      }),

      prisma.rankHistory.createMany({
        data: dataToInsert
      })
    ]);
  }
}
