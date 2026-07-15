import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateConnectionDto {
  @IsString()
  @IsOptional()
  accessToken?: string
  
  @IsString()
  @IsNotEmpty()
  platformName!: string

  @IsString()
  @IsNotEmpty()
  externalId!: string
}