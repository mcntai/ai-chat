import { Injectable } from '@nestjs/common';
import { PreferenceRepository } from 'modules/models/preference/preference.repository';
import { InternalServerError } from 'common/errors';
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

  public async getValue(key: string, validationSchema?): Promise<any> {
    assert(key, 'key is required');

    const { value } = await this.preferenceRepository.findOne({
      where:  { key },
      select: ['value'],
    }) || {};

    if (validationSchema) {
      await validationSchema.assert(value, {
        clazz      : InternalServerError,
        errorPrefix: `Preference.${key} is not properly configured.`,
      });
    }

    return value;
  }
}
