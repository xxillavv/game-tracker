import { Injectable, NotFoundException } from '@nestjs/common';
import { DotaProvider } from '../providers/dota-api.service.js';
import { PrismaService } from '../lib/prisma.service.js';

@Injectable()
export class MatchesService {
  constructor(private readonly dotaProvider: DotaProvider,
    private readonly prisma: PrismaService
  ) { }

  async getDotaMatches(userId) {
    const dotaInfo = await this.prisma.games.findFirstOrThrow({
      where: { name: "DOTA" }
    })

    const statsInfo = await this.prisma.gameStats.findFirstOrThrow({
      where: {
        connections: {
          connectinUserId: userId,
        }
      },
      select: {
        statId: true
      }
    })

    let matches = await this.prisma.matches.findMany({
      where: {
        statsMatchId: statsInfo.statId,
        gameMatchId: dotaInfo.gameId,
      }
    })

    if (!matches.length) {
      await this.syncDotaMatches(userId)

      matches = await this.prisma.matches.findMany({
        where: {
          gameMatchId: dotaInfo.gameId,
          statsMatchId: statsInfo.statId
        }
      })
    }

    return matches
  }

  async syncDotaMatches(userId) {
    const dotaInfo = await this.prisma.games.findFirstOrThrow({
      where: { name: "DOTA" }
    })

    const statsInfo = await this.prisma.gameStats.findFirstOrThrow({
      where: {
        connections: {
          connectinUserId: userId,
        }
      },
      select: {
        statId: true,
        connections: {
          select: {
            externalId: true
          }
        }
      }
    })

    if (!statsInfo.connections.externalId) {
      throw new NotFoundException("Steam ID is not found.")
    }

    const syncMatches = await this.dotaProvider.getMatches(statsInfo.connections.externalId)

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

    await this.prisma.$transaction([
      this.prisma.matches.deleteMany({
        where: {
          statsMatchId: statsInfo.statId,
          gameMatchId: dotaInfo.gameId,
        },
      }),

      this.prisma.matches.createMany({
        data: dataToInsert
      }),
    ]);
  }
}
