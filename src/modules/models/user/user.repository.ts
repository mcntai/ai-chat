import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseRepository } from '../base/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from './user.repository.interface';
import * as assert from 'assert';

export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }

  public async getUserBalance(id: string): Promise<number> {
    assert(id, 'user id is required');

    const { coins, paidCoins } = await this.findById(id);

    return Number(coins + paidCoins);
  }
}