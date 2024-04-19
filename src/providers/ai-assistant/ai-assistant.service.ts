import { Injectable } from '@nestjs/common';
import { Keys } from 'modules/models/preference/preference.entity';
import { PreferenceService } from 'modules/models/preference/preference.service';
import { ACTIVE_AI_TYPE } from 'common/constants/message';
import * as assert from 'assert';
import { object, string } from 'sito';
import { GenericHandlerInterface } from 'providers/ai-assistant/generic-handler.interface';

@Injectable()
export class AiAssistantService {
  constructor(private readonly preferenceService: PreferenceService) {
  }

  public async getHandler(aiType: ACTIVE_AI_TYPE): Promise<GenericHandlerInterface> {
    const commonActiveValidator = string().notEmpty().required();

    const config = await this.preferenceService.getValue(Keys.AI_HANDLERS, object({
        active: object({
          textGenerator:  commonActiveValidator,
          imageGenerator: commonActiveValidator,
          imageScanner:   commonActiveValidator,
        }).required().notEmpty(),
      })
        .required()
        .notEmpty(),
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
