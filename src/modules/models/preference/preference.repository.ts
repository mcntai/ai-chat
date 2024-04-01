import { BaseRepository } from 'modules/models/base/base.repository';
import { Preference } from './preference.entity';
import { PreferenceRepositoryInterface } from './preference.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PreferenceRepository extends BaseRepository<Preference> implements PreferenceRepositoryInterface {
  constructor(@InjectRepository(Preference) private readonly preferenceRepository: Repository<Preference>) {
    super(preferenceRepository);
  }
}