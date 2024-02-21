import { BaseRepository } from 'modules/base/base.repository';
import { Chat } from './chat.entity';
import { ChatRepositoryInterface } from './chat.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ChatRepository extends BaseRepository<Chat> implements ChatRepositoryInterface {
  constructor(@InjectRepository(Chat) private readonly chatRepository: Repository<Chat>) {
    super(chatRepository);
  }
}