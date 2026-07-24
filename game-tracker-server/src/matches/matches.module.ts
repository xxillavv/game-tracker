import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service.js';
import { MatchesController } from './matches.controller.js';
import { DotaProvider } from '../providers/dota-api.service.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService, DotaProvider],
  imports: [HttpModule]
})
export class MatchesModule { }
