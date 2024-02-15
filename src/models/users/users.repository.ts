import { User } from './entities/user.entity';
import { BaseRepository } from '../base.repository';
import { EntityRepository } from 'typeorm';
import { UserEntity } from './serializers/user.serializer';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { allUserGroupsForSerializing } from './serializers/user.serializer';

export class UsersRepository extends BaseRepository<UserEntity> {
  transform(model: User): UserEntity {
    const transformOptions = {
      groups: allUserGroupsForSerializing,
    };

    return plainToInstance(
      UserEntity,
      instanceToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: User[]): UserEntity[] {
    return models.map(model => this.transform(model));
  }
}