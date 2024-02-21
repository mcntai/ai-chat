import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseRepository } from '../base/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from './user.repository.interface';

export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }
}