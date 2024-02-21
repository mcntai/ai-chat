import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm';
import { BaseEntityInterface } from './base.interface';

export abstract class Base implements BaseEntityInterface {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  public created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated: Date;
}