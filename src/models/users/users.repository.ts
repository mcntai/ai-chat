import { User } from './entities/user.entity';
import { BaseRepository } from '../base/base.repository';
import { Repository } from 'typeorm';

export class UsersRepository extends BaseRepository<User> {
  constructor(repository: Repository<User>) {
    super(repository);
  }
}