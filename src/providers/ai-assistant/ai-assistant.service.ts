import { Injectable } from '@nestjs/common';
import { Keys } from 'modules/models/preference/preference.entity';
import { AiHandlersConfigSchema } from 'modules/models/preference/preference.dto';
import { PreferenceService } from 'modules/models/preference/preference.service';
import { ACTIVE_AI_TYPE } from 'common/constants/message';
import * as assert from 'assert';

interface AiServiceHandler {
  process(data: any): any;
}

@Injectable()
export class AiAssistantService {
  constructor(
    private readonly preferenceService: PreferenceService,
  ) {
  }

  public static async getHandler(aiType: ACTIVE_AI_TYPE): Promise<AiServiceHandler> {
    // const config = await this.preferenceService.getValue(Keys.AI_HANDLERS, AiHandlersConfigSchema);

    const config = {
      textGenerator:  'OpenAiTextGenerator',
      imageGenerator: 'OpenAiImageGenerator',
    };

    const handlerName = config[aiType];

    assert(handlerName, `No handler found for ${aiType}`);

    try {
      const Handler = await import('./handlers');

      return new Handler[handlerName]();
    } catch (error) {
      throw new Error(`Failed to create handler for ${handlerName}: ${error}`);
    }
  }
}
