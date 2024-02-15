import { Expose } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from 'models/base.serializer';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];
export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];
export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];

export class UserEntity extends BaseEntity implements IUser {
  email: string;
  name: null | string;

  @Expose({ groups: ['user.password'] })
  password: string;
}