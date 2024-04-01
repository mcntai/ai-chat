import { BaseEntityInterface } from 'modules/models/base/base.interface';

export interface PreferenceInterface extends BaseEntityInterface {
  key: string;
  value: object;
}