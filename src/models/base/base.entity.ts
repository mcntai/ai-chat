import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IBase } from './base.interface';

export abstract class Base implements IBase {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}