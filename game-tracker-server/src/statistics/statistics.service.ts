import { Injectable, NotFoundException } from '@nestjs/common';
import { DotaProvider } from '../providers/dota-api.service.js';
import { PrismaService } from '../lib/prisma.service.js';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly dotaProvider: DotaProvider,
    private readonly prisma: PrismaService,
  ) {}

  async getDotaProfile(userId: number) {
    const cachedStats = await this.prisma.gameStats.findFirst({
      where: { connections: { connectinUserId: userId } },
    });

    if (!cachedStats) {
      return await this.syncDotaStats(userId);
    }

    return cachedStats;
  }

  async syncDotaStats(userId: number) {
    const userInfo = await this.prisma.connections.findFirstOrThrow({
      where: { connectinUserId: userId },
      select: { externalId: true, connectionId: true },
    });

    const stats = await this.dotaProvider.getPlayerStats(userInfo.externalId);
    const winrate = await this.dotaProvider.getPlayerWinrate(
      userInfo.externalId,
    );

    return await this.prisma.gameStats.upsert({
      where: { statsConnectionId: userInfo.connectionId },
      update: {
        metadata: {
          accountId: stats.profile.account_id,
          name: stats.profile.personaname,
          rank: stats.rank_tier,
          matchesWin: winrate.win,
          matchesLose: winrate.lose,
          dotaPlus: stats.profile.plus,
        },
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
        },
      },
    });
  }

  async getDotaRatings(userId: number) {
    const cachedRatings = await this.prisma.ratingHistory.findMany({
      where: {
        gameStats: { connections: { connectinUserId: userId } },
      },
      orderBy: { achievedAt: 'desc' },
    });

    if (cachedRatings.length === 0) {
      await this.syncDotaRatings(userId);

      return await this.prisma.ratingHistory.findMany({
        where: { gameStats: { connections: { connectinUserId: userId } } },
        orderBy: { achievedAt: 'desc' },
      });
    }

    return cachedRatings;
  }

  async syncDotaRatings(userId: number) {
    const userInfo = await this.prisma.connections.findFirstOrThrow({
      where: { connectinUserId: userId },
      select: {
        externalId: true,
        gameStats: { select: { statId: true } },
      },
    });

    if (!userInfo.gameStats)
      throw new NotFoundException('Game stats not found');

    const ratingsList = await this.dotaProvider.getPlayerRatings(
      userInfo.externalId,
    );

    const dataToInsert = ratingsList.map((r) => ({
      ratingStatId: userInfo.gameStats!.statId,
      achievedAt: new Date(r.time),
      ratingTier: r.rank_tier,
    }));

    await this.prisma.$transaction([
      this.prisma.ratingHistory.deleteMany({
        where: { ratingStatId: userInfo.gameStats.statId },
      }),

      this.prisma.ratingHistory.createMany({
        data: dataToInsert,
      }),
    ]);

    return await this.prisma.ratingHistory.findMany({
      where: { gameStats: { connections: { connectinUserId: userId } } },
      orderBy: { achievedAt: 'desc' },
    });
  }
}
