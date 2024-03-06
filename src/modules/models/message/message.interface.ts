import { BaseEntityInterface } from 'modules/models/base/base.interface';
import { Actor, AttachmentType } from 'modules/models/message/message.entity';
import { Chat } from 'modules/models/chat/chat.entity';

export interface MessageInterface extends BaseEntityInterface {
  text: string;
  chat: Chat;
  actor: Actor;
  attachment: string;
  attachmentType: AttachmentType;
}