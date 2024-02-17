import { Entity, Column, OneToMany } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';
import { Base } from 'models/base/base.entity';
import { LinkedAccountEntity } from 'models/linked-accounts/entities/linked-account.entity';

@Entity({ name: 'Users' })
export class User extends Base implements UserInterface {
  @Column()
  authToken: string;

  @Column()
  coins: number;

  @Column()
  paidCoins: number;

  @OneToMany(() => LinkedAccountEntity, account => account.owner)
  accounts: LinkedAccountEntity[];
}
