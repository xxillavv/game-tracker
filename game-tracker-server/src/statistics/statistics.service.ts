import { Injectable } from '@nestjs/common';
import { DotaProvider } from '../providers/dota-api.service.js';
import { prisma } from '../../lib/prisma.js';

@Injectable()
export class StatisticsService {
  constructor(private readonly dotaProvider: DotaProvider) { }

  async getDotaProfile(userId) {
    const userInfo = await prisma.platformInfo.findFirstOrThrow({
      where: { platformUserId: userId },
      select: {
        externalId: true,
        platformId: true
      }
    })

    const stats = await this.dotaProvider.getPlayerStats(userInfo.externalId)
    const winrate = await this.dotaProvider.getPlayerWinrate(userInfo.externalId)
    const ratings = await this.dotaProvider.getPlayerRatings(userInfo.externalId)

    await prisma.gameStats.create({
      data: {
        platformId: userInfo.platformId,
        metadata: {
          accountId: stats.profile.account_id,
          name: stats.profile.personaname,
          rank: stats.rank_tier,
          matchesWin: winrate.win,
          matchesLose: winrate.lose,
          dotaPlus: stats.profile.plus,
        },
        ratings: {
          
        }
      }
    })
  }

  async getDotaRatings(userId) {
    const userInfo = await prisma.platformInfo.findFirstOrThrow({
      where: { platformUserId: userId },
      select: {
        externalId: true,
        platformId: true
      }
    })



    await prisma
  }
}
