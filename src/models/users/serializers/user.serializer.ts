import { UserInterface } from '../interfaces/user.interface';
import { BaseEntity } from 'models/base/base.serializer';

export class UserEntity extends BaseEntity implements UserInterface {
  authToken: string;
  coins: number;
  paidCoins: number;
}