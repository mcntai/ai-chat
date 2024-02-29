import { Entity, Column, OneToMany } from 'typeorm';
import { UserInterface } from './user.interface';
import { Base } from 'modules/base/base.entity';
import { Chat } from 'modules/chat/chat.entity';
import { LinkedAccount } from 'modules/linked-account/linked-account.entity';

@Entity({ name: 'User' })
export class User extends Base implements UserInterface {
  @Column({ unique: true, length: 255, nullable: true })
  authToken: string;

  @Column()
  coins: number;

  @Column({ default: 0 })
  paidCoins: number;

  @OneToMany(() => LinkedAccount, account => account.owner)
  accounts: LinkedAccount[];

  @OneToMany(() => Chat, chat => chat.owner)
  chats: Chat[];
}