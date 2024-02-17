import { Expose } from 'class-transformer';
import { IBase } from './base.interface';

export class BaseEntity implements IBase {
  id: string;

  @Expose({ groups: ['timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['timestamps'] })
  updatedAt: Date;
}