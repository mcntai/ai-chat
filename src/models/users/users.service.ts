import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {
  }

  async get(
    id: string,
    relations: string[] = [],
  ): Promise<UserEntity | null> {
    return await this.usersRepository.findById(id);
  }

  async create(inputs: any): Promise<UserEntity> {
    return await this.usersRepository.create(inputs);
  }

  async update(user: UserEntity, inputs: any): Promise<UserEntity> {
    return await this.usersRepository.update(inputs);
  }
}
