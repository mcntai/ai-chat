import { BaseEntityInterface } from 'modules/base/base.interface';
import { Actor, AttachmentType } from 'modules/message/message.entity';
import { Chat } from 'modules/chat/chat.entity';

export interface MessageInterface extends BaseEntityInterface {
  text: string;
  chat: Chat;
  actor: Actor;
  attachment: string;
  attachmentType: AttachmentType;
}