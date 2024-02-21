import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { User } from 'modules/user/user.entity';
import { Base } from 'modules/base/base.entity';
import { LinkedAccountInterface } from './linked-account.interface';

export enum AccountType {
  GOOGLE = 'google',
  APPLE = 'apple',
}

@Entity({ name: 'LinkedAccount' })
export class LinkedAccount extends Base implements LinkedAccountInterface {
  @Index()
  @Column({
    type:   'enum',
    enum:   AccountType,
  })
  accountType: AccountType;

  @Column({ length: 255 })
  externalId: string;

  @ManyToOne(() => User, user => user.accounts)
  owner: User;
}
