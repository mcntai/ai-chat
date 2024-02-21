import { BaseRepositoryInterface } from 'modules/base/base.repository.interface';
import { Message } from './message.entity';

export interface MessageRepositoryInterface extends BaseRepositoryInterface<Message> {
}