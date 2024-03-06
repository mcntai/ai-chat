import { BaseEntityInterface } from 'modules/models/base/base.interface';
import { User } from 'modules/models/user/user.entity';

export enum AccountType {
  GOOGLE = 'google',
  APPLE = 'apple',
}

export interface LinkedAccountInterface extends BaseEntityInterface {
  accountType: AccountType;
  externalId: string;
  owner: User;
}