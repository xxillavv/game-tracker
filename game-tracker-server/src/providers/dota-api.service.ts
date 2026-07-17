import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { prisma } from "../../lib/prisma.js";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";


@Injectable()
export class DotaApiProvider {
  constructor(private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  async getStatistics(userId) {
    const externalData = await prisma.platformInfo.findFirst({
      where: {
        platformUserId: userId,
      },
      select: {
        externalId: true
      }
    })

    if (!externalData) {
      throw new NotFoundException("User with this ID is not found.")
    }

    if (!externalData.externalId) {
      throw new BadRequestException('Please connect your Steam ID.')
    }

    try {
      const response = await this.httpService.get(`${this.configService.getOrThrow('DOTA_OPEN_API')}/players/${externalData.externalId}`)

      return response
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError?.response?.status === 404) {
        throw new NotFoundException("Player not found.")
      }

      throw new ServiceUnavailableException("Issues with the statistics server. Please try again later.")
    }
  }
}