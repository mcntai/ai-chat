import { BaseRepositoryInterface } from 'modules/base/base.repository.interface';
import { User } from './user.entity';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
  getUserBalance(id: string): Promise<number>;
}