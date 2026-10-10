export type TPlatformTypes = "STEAM" | "RIOT" | "SUPERCELL"

export interface ICreateConnectionBody {
  accessToken?: string
  platformName: TPlatformTypes
  externalId: string
}

export interface ICreateConnectionResponse {
  createdAt: Date;
  updatedAt: Date;
  accessToken: string | null;
  connectionId: number;
  connectinUserId: number;
  platformName: TPlatformTypes
  externalId: string;
}