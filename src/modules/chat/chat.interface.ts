import { BaseEntityInterface } from 'modules/base/base.interface';
import { User } from 'modules/user/user.entity';

export interface ChatInterface extends BaseEntityInterface {
  name: string;
  pinned: boolean;
  archived: boolean;
  owner: User;
}