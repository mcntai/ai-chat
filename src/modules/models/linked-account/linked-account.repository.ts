import { BaseRepository } from 'modules/models/base/base.repository';
import { LinkedAccount } from './linked-account.entity';
import { LinkedAccountRepositoryInterface } from './linked-account.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class LinkedAccountRepository extends BaseRepository<LinkedAccount>
  implements LinkedAccountRepositoryInterface {
  constructor(@InjectRepository(LinkedAccount) private readonly linkedAccountRepository: Repository<LinkedAccount>) {
    super(linkedAccountRepository);
  }
}