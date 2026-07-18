import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import type { TRequestWithUser } from '../../utils/types/request.types.js';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  @UseGuards(AuthGuard)
  @Get()
  getDotaMatches(@Req() request: TRequestWithUser) {
    return this.matchesService.getDotaMatches(request.user.userId)
  }

}
