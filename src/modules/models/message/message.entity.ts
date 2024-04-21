import { Entity, Column, ManyToOne } from 'typeorm';
import { Chat } from 'modules/models/chat/chat.entity';
import { Base } from 'modules/models/base/base.entity';
import { MessageInterface } from './message.interface';
import { ACTOR, ATTACHMENT_TYPE } from 'common/constants/message';

@Entity({ name: 'Message' })
export class Message extends Base implements MessageInterface {
  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'enum', enum: ACTOR })
  actor: ACTOR;

  @Column({ length: 400, nullable: true })
  attachment: string;

  @Column({ type: 'enum', enum: ATTACHMENT_TYPE, nullable: true })
  attachmentType: ATTACHMENT_TYPE;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;
}
