import { BaseEntityInterface } from 'modules/models/base/base.interface';
import { ACTOR, ATTACHMENT_TYPE } from 'common/constants/message';
import { Chat } from 'modules/models/chat/chat.entity';

export interface MessageInterface extends BaseEntityInterface {
  text: string;
  chat: Chat;
  actor: ACTOR;
  attachment: string;
  attachmentType: ATTACHMENT_TYPE;
}