import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TRequestWithUser } from "../types/request.types.js";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) { }
  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<TRequestWithUser>()

    const accessToken = request.cookies['accessToken']

    if (!accessToken) {
      throw new UnauthorizedException("Authorization token is missing.")
    }

    const payload = await this.jwt.verifyAsync(accessToken)

    if (!payload || isNaN(+payload.sub)) {
      throw new UnauthorizedException("Invalid or expired token.")
    }

    request.user = { userId: +payload.sub }

    return true
  }
}