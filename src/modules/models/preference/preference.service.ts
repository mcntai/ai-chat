import { Injectable } from '@nestjs/common';
import { PreferenceRepository } from 'modules/models/preference/preference.repository';
import { validateOrReject } from 'class-validator';
import * as assert from 'assert';

@Injectable()
export class PreferenceService {
  constructor(private readonly preferenceRepository: PreferenceRepository) {
  }

  public async set(key: string, value: any): Promise<void> {
    assert(key, 'key is required');
    assert(value, 'value is required');

    await this.preferenceRepository.create({ key, value });
  }

  public async getValue(key: string, validationSchema?: any): Promise<any> {
    assert(key, 'key is required');

    const { value } = await this.preferenceRepository.findOne({
      where:  { key },
      select: ['value'],
    }) || {};

    if (validationSchema) {
      try {
        const payload = new validationSchema(value);

        await validateOrReject(payload);
      } catch (error) {
        throw new Error(`Preference.${key} is not properly configured. ` + JSON.stringify(error));
      }
    }

    return value;
  }
}
