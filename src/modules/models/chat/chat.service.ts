import { Injectable } from '@nestjs/common';
import { Chat } from 'modules/models/chat/chat.entity';
import { ChatRepository } from 'modules/models/chat/chat.repository';

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

  public getChats(user): Promise<Chat[]> {
    return this.chatRepository.findAll({ where: { owner: user } });
  }

  public updateChat(id, payload): Promise<Chat> {
    const { pinned, archived } = payload;

    return this.chatRepository.update({ id, pinned, archived });
  }

  public async deleteChat(id): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
