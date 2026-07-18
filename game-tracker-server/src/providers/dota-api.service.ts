import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { prisma } from "../../lib/prisma.js";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { IDotaMatches, IDotaPlayerStatsResponse, IDotaRatings, IDotaWinrate } from "../../utils/types/providers.types.js";
import { firstValueFrom } from "rxjs";

@Injectable()
export class DotaProvider {
  constructor(private readonly httpService: HttpService) { }

  private dotaApi = "https://api.opendota.com/api"

  async getPlayerStats(accountId) {
    try {
      const observable = await this.httpService.get<IDotaPlayerStatsResponse>(`${this.dotaApi}/players/${accountId}`)

      const response = await firstValueFrom(observable)

      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError?.response?.status === 404) {
        throw new NotFoundException("Player not found.")
      }

      throw new ServiceUnavailableException("Issues with the statistics server. Please try again later.")
    }
  }

  async getPlayerWinrate(accountId) {
    try {
      const observable = await this.httpService.get<IDotaWinrate>(`${this.dotaApi}/players/${accountId}/wl`)

      const response = await firstValueFrom(observable)

      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError?.response?.status === 404) {
        throw new NotFoundException("Player not found.")
      }

      throw new ServiceUnavailableException("Issues with the statistics server. Please try again later.")
    }
  }

  async getPlayerRatings(accountId) {
    try {
      const observable = await this.httpService.get<IDotaRatings[]>(`${this.dotaApi}/players/${accountId}/ratings`)

      const response = await firstValueFrom(observable)

      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError?.response?.status === 404) {
        throw new NotFoundException("Player not found.")
      }

      throw new ServiceUnavailableException("Issues with the statistics server. Please try again later.")
    }
  }

  async getMatches(accountId) {
    try {
      const observable = await this.httpService.get<IDotaMatches[]>(`${this.dotaApi}/players/${accountId}/recentMatches`)

      const response = await firstValueFrom(observable)

      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError?.response?.status === 404) {
        throw new NotFoundException("Player not found.")
      }

      throw new ServiceUnavailableException("Issues with the statistics server. Please try again later.")
    }
  }
}