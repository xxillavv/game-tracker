import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TRequestWithUser } from '../../utils/types/request.types.js';

type TAccessPayload = {
  sub: number;
  email: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<TRequestWithUser>();
    const cookies = request.cookies as
      Record<string, string | undefined> | undefined;
    const accessToken = cookies?.['accessToken'];

    if (!accessToken) {
      throw new UnauthorizedException('Authorization token is missing.');
    }

    const payload: TAccessPayload = await this.jwt.verifyAsync(accessToken);

    if (!payload || isNaN(+payload.sub)) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    request.user = { userId: +payload.sub };

    return true;
  }
}
