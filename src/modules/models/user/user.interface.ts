import { BaseEntityInterface } from 'modules/models/base/base.interface';
import { LinkedAccount } from 'modules/models/linked-account/linked-account.entity';
import { Chat } from 'modules/models/chat/chat.entity';

export interface UserInterface extends BaseEntityInterface {
  authToken: string;
  coins: number;
  paidCoins: number;
  accounts: LinkedAccount[];
  chats: Chat[];
}