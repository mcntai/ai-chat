import { Entity, Column, ManyToOne, Index, OneToMany } from 'typeorm';
import { User } from 'modules/models/user/user.entity';
import { Base } from 'modules/models/base/base.entity';
import { Message } from 'modules/models/message/message.entity';
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
