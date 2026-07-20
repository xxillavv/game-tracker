import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DotaProvider } from '../providers/dota-api.service.js';
import { prisma } from '../../lib/prisma.js';

@Injectable()
export class MatchesService {
  constructor(private readonly dotaProvider: DotaProvider) { }

  async getDotaMatches(userId) {
    const dotaInfo = await prisma.game.findFirstOrThrow({
      where: { name: "DOTA" }
    })

    const statsInfo = await prisma.gameStats.findFirstOrThrow({
      where: {
        platform: {
          platformUserId: userId,
        }
      },
      select: {
        statId: true
      }
    })

    let matches = await prisma.match.findMany({
      where: {
        statsMatchId: statsInfo.statId,
        gameMatchId: dotaInfo.gameId,
      }
    })

    if (!matches.length) {
      await this.syncDotaMatches(userId)

      matches = await prisma.match.findMany({
        where: {
          gameMatchId: dotaInfo.gameId,
          statsMatchId: statsInfo.statId
        }
      })
    }

    return matches
  }

  async syncDotaMatches(userId) {
    const dotaInfo = await prisma.game.findFirstOrThrow({
      where: { name: "DOTA" }
    })

    const statsInfo = await prisma.gameStats.findFirstOrThrow({
      where: {
        platform: {
          platformUserId: userId,
        }
      },
      select: {
        statId: true,
        platform: {
          select: {
            externalId: true
          }
        }
      }
    })

    if (!statsInfo.platform.externalId) {
      throw new NotFoundException("Steam ID is not found.")
    }

    const syncMatches = await this.dotaProvider.getMatches(statsInfo.platform.externalId)

    const dataToInsert = syncMatches.map((el) => {
      return {
        gameMatchId: dotaInfo.gameId,
        statsMatchId: statsInfo.statId,
        metadata: {
          assists: el.assists,
          deaths: el.deaths,
          kills: el.kills,
          duration: el.duration,
          goldPerMinute: el.gold_per_min,
          role: el.lane_role,
          matchId: el.match_id,
          isRadiantWin: el.radiant_win,
          towerDamage: el.tower_damage,
          heroDamage: el.hero_damage
        }
      }
    })

    await prisma.$transaction([
      prisma.match.deleteMany({
        where: {
          statsMatchId: statsInfo.statId,
          gameMatchId: dotaInfo.gameId,
        },
      }),

      prisma.match.createMany({
        data: dataToInsert
      }),
    ]);
  }
}
