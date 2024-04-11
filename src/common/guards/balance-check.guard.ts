import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/models/user/user.service';

@Injectable()
export class BalanceCheckGuard {
  constructor(private readonly userService: UserService) {
  }
  canActivate() {
    return true;
  }
}