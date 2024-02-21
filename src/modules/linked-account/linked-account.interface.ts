import { BaseEntityInterface } from 'modules/base/base.interface';
import { User } from 'modules/user/user.entity';

export interface LinkedAccountInterface extends BaseEntityInterface {
  accountType: string;
  externalId: string;
  owner: User;
}