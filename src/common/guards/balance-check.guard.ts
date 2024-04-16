import { ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'modules/models/user/user.service';
import { argumentsAssert } from 'common/errors';

@Injectable()
export class BalanceCheckGuard {
  constructor(private readonly userService: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (!body.subscribed) {
      const userBalance = await this.userService.getUserBalance(request.user);

      argumentsAssert(Boolean(userBalance), 'Insufficient balance');

      return true;
    }

    return true;
  }
}