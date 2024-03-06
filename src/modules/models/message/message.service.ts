import { Injectable } from '@nestjs/common';
import { MessageRepository } from 'modules/models/message/message.repository';
import { Message, Actor } from 'modules/models/message/message.entity';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    ) {
  }

  public getMessages(chatId): Promise<Message[]> {
    return this.messageRepository.findAll({ where: { chatId } });
  }

  public createMessage(payload): Promise<Message> {
    const { chatId, text, subscriptionStatus, attachmentType, attachment } = payload;

    if (chatId) {
      // TODO:validate that chat with such id belongs to this user
      return this.messageRepository.create({

      });
    }
  }
}
