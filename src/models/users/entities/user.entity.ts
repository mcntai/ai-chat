import { Entity, Column, } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Base } from 'models/base.entity';

@Entity({ name: 'Users' })
export class User extends Base implements IUser {
  @Column()
  email: string;

  @Column({ nullable: true, default: null })
  name: null | string;

  @Column()
  password: string;
}
