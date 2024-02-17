import { Repository, DeleteResult, FindOptionsWhere } from 'typeorm';
import { Base } from './base.entity';

export abstract class BaseRepository<T extends Base> {
  private repository: Repository<T>;

  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async create(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  public async update(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  public async findById(id: string): Promise<T> {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  public async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
