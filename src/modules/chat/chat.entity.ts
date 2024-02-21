import { Entity, Column, ManyToOne, Index, OneToMany } from 'typeorm';
import { User } from 'modules/user/user.entity';
import { Base } from 'modules/base/base.entity';
import { Message } from 'modules/message/message.entity';
import { ChatInterface } from './chat.interface';

@Entity({ name: 'Chat' })
export class Chat extends Base implements ChatInterface {
  @Column({ length: 255 })
  name: string;

  @Index()
  @Column({ default: false })
  pinned: boolean;

  @Index()
  @Column({ default: false })
  archived: boolean;

  @ManyToOne(() => User, user => user.chats)
  owner: User;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];
}
