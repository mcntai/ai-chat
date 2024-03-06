import { BaseRepositoryInterface } from 'modules/models/base/base.repository.interface';
import { Message } from './message.entity';

export interface MessageRepositoryInterface extends BaseRepositoryInterface<Message> {
}