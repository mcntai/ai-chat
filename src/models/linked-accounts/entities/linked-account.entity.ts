import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'models/users/entities/user.entity';
import { Base } from 'models/base/base.entity';

@Entity({ name: 'LinkedAccounts' })
export class LinkedAccountEntity extends Base {
  @Column()
  accountNumber: string;

  @Column()
  balance: number;

  @ManyToOne(() => User, user => user.accounts)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
