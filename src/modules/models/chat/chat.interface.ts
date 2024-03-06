import { BaseEntityInterface } from 'modules/models/base/base.interface';
import { User } from 'modules/models/user/user.entity';

export interface ChatInterface extends BaseEntityInterface {
  name: string;
  pinned: boolean;
  archived: boolean;
  owner: User;
}