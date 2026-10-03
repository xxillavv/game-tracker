import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma.service.js';
import { DotaProvider } from '../providers/dota-api.service.js';

@Injectable()
export class LeaderboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dotaProvider: DotaProvider,
  ) {}

  async getLeaderboard(limit = 10, page = 1) {
    const skip = (page - 1) * limit;

    const count = await this.prisma.leaderboard.count();

    if (count === 0) {
      await this.syncLeaderboard();
    }

    const [totalCount, data] = await this.prisma.$transaction([
      this.prisma.leaderboard.count(),
      this.prisma.leaderboard.findMany({
        take: limit,
        skip,
        orderBy: {
          playerRank: 'asc',
        },
      }),
    ]);

    return {
      data,
      metadata: {
        currentPage: page,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async syncLeaderboard() {
    const apiData = await this.dotaProvider.getLeaderboard();

    const mappedApiData = apiData.leaderboard.map((el) => ({
      playerRank: el.rank,
      username: el.name,
      teamName: el.team_tag,
      teamId: el.team_id,
    }));

    await this.prisma.$transaction([
      this.prisma.leaderboard.deleteMany(),
      this.prisma.leaderboard.createMany({
        data: mappedApiData,
      }),
    ]);
  }
}
