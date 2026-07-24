import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DotaProvider } from '../providers/dota-api.service.js';
import { prisma } from '../../lib/prisma.js';

@Injectable()
export class MatchesService {
  constructor(private readonly dotaProvider: DotaProvider) { }

  async getDotaMatches(userId) {
    const dotaId = await prisma.game.findFirstOrThrow({
      where: { name: "DOTA" }
    })

    const statsId = await prisma.gameStats.findFirstOrThrow({
      where: {
        platform: {
          platformUserId: userId
        }
      },
      select: {
        statId: true
      }
    })




  }

  async syncDotaMatches() {

  }
}
