import { Injectable, NotFoundException } from '@nestjs/common';
import { DotaProvider } from '../providers/dota-api.service.js';
import { PrismaService } from '../lib/prisma.service.js';

@Injectable()
export class MatchesService {
  constructor(private readonly dotaProvider: DotaProvider,
    private readonly prisma: PrismaService
  ) { }

  async getDotaMatches(userId: number) {
    const dotaInfo = await this.prisma.games.findFirst({
      where: { name: "DOTA" }
    })

    if (!dotaInfo) {
      throw new NotFoundException("Game 'DOTA' not found.")
    }

    const connection = await this.prisma.connections.findFirst({
      where: {
        connectinUserId: userId,
      },
      select: {
        connectionId: true,
      }
    })

    if (!connection) {
      throw new NotFoundException("Connection not found.")
    }

    const matches = await this.prisma.matches.findMany({
      where: {
        connectionMatchId: connection.connectionId,
        gameMatchId: dotaInfo.gameId,
      }
    })

    if (!matches.length) {
      return await this.syncDotaMatches(userId)
    }

    return matches
  }

  async syncDotaMatches(userId: number) {
    const dotaInfo = await this.prisma.games.findFirst({
      where: { name: "DOTA" }
    })

    if (!dotaInfo) {
      throw new NotFoundException("Game 'DOTA' not found.")
    }

    const connection = await this.prisma.connections.findFirst({
      where: {
        connectinUserId: userId,
      },
      select: {
        connectionId: true,
        externalId: true,
      }
    })

    if (!connection) {
      throw new NotFoundException("Connection not found.")
    }

    if (!connection.externalId) {
      throw new NotFoundException("Steam ID is not found.")
    }

    const syncMatches = await this.dotaProvider.getMatches(connection.externalId)

    const dataToInsert = syncMatches.map((el) => {
      return {
        gameMatchId: dotaInfo.gameId,
        connectionMatchId: connection.connectionId,
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
          connectionMatchId: connection.connectionId,
          gameMatchId: dotaInfo.gameId,
        },
      }),

      this.prisma.matches.createMany({
        data: dataToInsert
      }),
    ]);

    return await this.prisma.matches.findMany({
      where: {
        connectionMatchId: connection.connectionId,
        gameMatchId: dotaInfo.gameId,
      }
    })
  }
}
