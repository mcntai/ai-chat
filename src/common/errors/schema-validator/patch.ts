import { Module } from '@nestjs/common';
import * as sito from 'sito';
import { compact } from 'common/utils/array';
import { ValidationError } from 'common/errors';

@Module({})
export class SitoPatchingModule {
  public static patch() {
    sito.interceptor.onError((validationError, params) => {
      const { clazz = ValidationError, errorPrefix } = params;

      const message = compact([errorPrefix, validationError.message]).join(' ');

      return new clazz(message, {
        path:    params.path,
        key:     params.key,
        value:   params.value,
        payload: params.payload,
      });
    });
  }
}
