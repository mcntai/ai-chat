import { Repository, DeleteResult, FindOptionsWhere } from 'typeorm';
import { Base } from './base.entity';
import { BaseRepositoryInterface } from 'modules/base/base.repository.interface';
import * as assert from 'assert';

export abstract class BaseRepository<T extends Base> implements BaseRepositoryInterface<T> {
  private repository: Repository<T>;

  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  public update(entity: T): Promise<T> {
    assert(entity.id, 'update operation requires entity to have id');

    return this.repository.save(entity);
  }

  public findById(id: string): Promise<T> {
    assert(id, 'id is required');

    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  public findOne(criteria: any): Promise<T> {
    return this.repository.findOne(criteria);
  }

  public findAll(): Promise<T[]> {
    return this.repository.find();
  }

  public delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
