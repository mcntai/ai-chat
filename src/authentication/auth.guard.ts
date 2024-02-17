import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: Request = context.switchToHttp().getRequest();

    return Boolean(user);
  }
}