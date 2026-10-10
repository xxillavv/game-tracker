import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PlatformNameEmun } from "../../generated/prisma/enums.js";

export class CreateConnectionDto {
  @IsString()
  @IsOptional()
  accessToken?: string
  
  @IsEnum(PlatformNameEmun)
  @IsNotEmpty()
  platformName!: PlatformNameEmun

  @IsString()
  @IsNotEmpty()
  externalId!: string
}