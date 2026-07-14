import { Request } from "express"

export type TRequestWithUser = Request & {
  user: {
    userId: number
  }
} 