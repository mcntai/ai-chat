import { Injectable } from '@nestjs/common';
import { Chat } from 'modules/models/chat/chat.entity';
import { ChatRepository } from 'modules/models/chat/chat.repository';
import { trimTime, addDays } from 'common/utils/date';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {
  }

  public createChat(payload): Promise<Chat> {
    return this.chatRepository.create(payload);
  }

  public getChatByCriteria(criteria): Promise<Chat> {
    return this.chatRepository.findOne(criteria);
  }

  public getChats(user, archived: boolean): Promise<Chat[]> {
    return this.chatRepository.findAll({
      where: {
        archived,
        owner:   user.id,
        created: archived ? undefined : MoreThanOrEqual(addDays(trimTime(new Date()), -30)),
      },
    });
  }

  public updateChat(id, payload): Promise<Chat> {
    const { pinned, archived, name } = payload;

    return this.chatRepository.update({ id, pinned, archived, name });
  }

  public async deleteChat(id): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
