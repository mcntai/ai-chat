import { BaseEntityInterface } from 'modules/base/base.interface';
import { User } from 'modules/user/user.entity';

export enum AccountType {
  GOOGLE = 'google',
  APPLE = 'apple',
}

export interface LinkedAccountInterface extends BaseEntityInterface {
  accountType: AccountType;
  externalId: string;
  owner: User;
}