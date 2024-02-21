import { BaseEntityInterface } from 'modules/base/base.interface';
import { LinkedAccount } from 'modules/linked-account/linked-account.entity';
import { Chat } from 'modules/chat/chat.entity';

export interface UserInterface extends BaseEntityInterface {
  authToken: string;
  coins: number;
  paidCoins: number;
  accounts: LinkedAccount[];
  chats: Chat[];
}