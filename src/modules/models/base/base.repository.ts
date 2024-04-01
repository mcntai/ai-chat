import { Repository, DeleteResult, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { Base } from './base.entity';
import { BaseRepositoryInterface } from 'modules/models/base/base.repository.interface';
import * as assert from 'assert';

export abstract class BaseRepository<T extends Base> implements BaseRepositoryInterface<T> {
  private repository: Repository<T>;

  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public create(entity: T | ObjectLiteral): Promise<T> {
    return this.repository.save(entity as T);
  }

  public async update(entity: T | ObjectLiteral): Promise<T> {
    assert(entity.id, 'update operation requires entity to have id');

    await this.repository.save(entity as T, { reload: true });

    return this.findById(entity.id);
  }

  public findById(id: string): Promise<T> {
    assert(id, 'id is required');

    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  public findOne(criteria: any): Promise<T> {
    return this.repository.findOne(criteria);
  }

  public findAll(criteria: any): Promise<T[]> {
    return this.repository.find(criteria);
  }

  public delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public exists(criteria: any): Promise<boolean> {
    return this.repository.exist({ where: criteria });
  }
}
