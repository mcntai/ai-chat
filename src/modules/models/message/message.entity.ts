import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { Chat } from 'modules/models/chat/chat.entity';
import { Base } from 'modules/models/base/base.entity';
import { MessageInterface } from './message.interface';

export enum Actor {
  USER = 'user',
  AI = 'ai',
}

export enum AttachmentType {
  IMAGE = 'image',
  AUDIO = 'audio',
}

@Entity({ name: 'Message' })
export class Message extends Base implements MessageInterface {
  @Column({ type: 'text' })
  text: string;

  @Index()
  @Column({ type: 'enum', enum: Actor })
  actor: Actor;

  @Column({ length: 255 })
  attachment: string;

  @Index()
  @Column({ type: 'enum', enum: AttachmentType })
  attachmentType: AttachmentType;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;
}
