import { Injectable } from '@nestjs/common';
import { Keys } from 'modules/models/preference/preference.entity';
import { PreferenceService } from 'modules/models/preference/preference.service';
import { ACTIVE_AI_TYPE } from 'common/constants/message';
import * as assert from 'assert';
import { object, string, array } from 'sito';

interface AiServiceHandler {
  process(data: any): any;
}

@Injectable()
export class AiAssistantService {
  constructor(private readonly preferenceService: PreferenceService) {
  }

  public async getHandler(aiType: ACTIVE_AI_TYPE): Promise<AiServiceHandler> {
    const commonActiveValidator = string().notEmpty().required();
    const commonAllValidator = array(string().notEmpty()).notEmpty().required();

    const config = await this.preferenceService.getValue(Keys.AI_HANDLERS, object({
        active: object({
          textGenerator:  commonActiveValidator,
          imageGenerator: commonActiveValidator,
          imageScanner:   commonActiveValidator,
        }).notEmpty(),

        all: object({
          textGenerator:  commonAllValidator,
          imageGenerator: commonAllValidator,
          imageScanner:   commonAllValidator,
        }).notEmpty(),
      })
        .required()
        .notEmpty()
        .strict(),
    );

    const handlerName = config.active[aiType];

    assert(handlerName, `No handler found for ${aiType}`);

    try {
      const Handler = await import('./handlers');

      return new Handler[handlerName]();
    } catch (error) {
      throw new Error(`Failed to create handler for ${handlerName}: ${error}`);
    }
  }
}
