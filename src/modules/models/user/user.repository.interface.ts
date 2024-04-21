import { BaseRepositoryInterface } from 'modules/models/base/base.repository.interface';
import { User } from './user.entity';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
}