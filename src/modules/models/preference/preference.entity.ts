import { Column, Entity } from 'typeorm';
import { Base } from 'modules/models/base/base.entity';
import { PreferenceInterface } from 'modules/models/preference/preference.interface';

export enum Keys {
  AI_SERVICES = 'AiServices',
}

@Entity({ name: 'Preference' })
export class Preference extends Base implements PreferenceInterface {
  @Column({ length: 36 })
  key: string;

  @Column({ type: 'json' })
  value: any;
}