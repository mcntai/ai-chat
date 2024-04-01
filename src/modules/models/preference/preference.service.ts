import { Injectable } from '@nestjs/common';
import { PreferenceRepository } from 'modules/models/preference/preference.repository';
import { validate } from 'class-validator';
import { InternalServerError } from 'common/errors';
import * as assert from 'assert';

@Injectable()
export class PreferenceService {
  constructor(private readonly preferenceRepository: PreferenceRepository) {
  }

  public async getValue(key: string, validationSchemaDTO?): Promise<any> {
    assert(key, 'Preference key is required');

    const { value } = await this.preferenceRepository.findOne({
      where:  { key },
      select: ['value'],
    });

    assert(value, `Preference.${key} not found`);

    if (validationSchemaDTO) {
      const payload = validationSchemaDTO.create(value);

      const errors = await validate(payload);

      if (errors.length) {
        throw new InternalServerError(`Preference.${key} is not properly configured. ` + JSON.stringify(errors));
      }
    }

    return value;
  }
}
