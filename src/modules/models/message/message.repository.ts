import { BaseRepository } from 'modules/models/base/base.repository';
import { Message } from './message.entity';
import { MessageRepositoryInterface } from './message.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class MessageRepository extends BaseRepository<Message> implements MessageRepositoryInterface {
  constructor(@InjectRepository(Message) private readonly messageRepository: Repository<Message>) {
    super(messageRepository);
  }
}