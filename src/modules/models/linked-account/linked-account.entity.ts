import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { User } from 'modules/models/user/user.entity';
import { Base } from 'modules/models/base/base.entity';
import { LinkedAccountInterface, AccountType } from './linked-account.interface';

@Entity({ name: 'LinkedAccount' })
export class LinkedAccount extends Base implements LinkedAccountInterface {
  @Index()
  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType: AccountType;

  @Column({ length: 255 })
  externalId: string;

  @ManyToOne(() => User, user => user.accounts)
  owner: User;
}
