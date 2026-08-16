import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma.service.js';
import { DotaProvider } from '../providers/dota-api.service.js';

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService,
    private readonly dotaProvider: DotaProvider
  ) { }

  async getLeaderboard(limit?: number) {
    let data = await this.prisma.leaderboard.findMany({
      take: limit,
      orderBy: {
        playerRank: 'asc',
      },
    });

    if (data.length === 0) {
      await this.syncLeaderboard();

      data = await this.prisma.leaderboard.findMany({
        take: limit,
        orderBy: {
          playerRank: 'asc',
        },
      });
    }

    return data;
  }

  async syncLeaderboard() {
    const data = await this.dotaProvider.getLeaderboard()

    const mappedData = data.leaderboard.map(el => ({
      playerRank: el.rank,
      username: el.name,
      teamName: el.team_tag,
      teamId: el.team_id
    }))

    await this.prisma.leaderboard.deleteMany()

    await this.prisma.leaderboard.createMany({
      data: mappedData
    })
  }
}
