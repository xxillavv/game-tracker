import { CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) { }
  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()

    const accessToken = request.cookies['accessToken']

    if (!accessToken) {
      throw new UnauthorizedException("Authorization token is missing.")
    }

    const isValid = await this.jwt.verifyAsync(accessToken)

    if (!isValid) {
      throw new ForbiddenException("Invalid or expired token.")
    }

    return true
  }
}