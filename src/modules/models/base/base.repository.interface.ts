import { DeepPartial, FindManyOptions, FindOneOptions, DeleteResult } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  create(data: DeepPartial<T>): Promise<T>;

  update(data: DeepPartial<T>): Promise<T>;

  findById(id: string): Promise<T>;

  findAll(options?: FindManyOptions<T>): Promise<T[]>;

  findOne(options: FindOneOptions<T>): Promise<T>;

  delete(id: string): Promise<DeleteResult>;

  exists(options: FindOneOptions<T>): Promise<boolean>;
}