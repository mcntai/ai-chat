import { Injectable } from '@nestjs/common';
import { Keys } from 'modules/models/preference/preference.entity';
import { AiServicesSchemaDTO } from 'modules/models/preference/preference.dto';
import { OpenAiService } from 'api-services/open-ai/open-ai.service';
import { PreferenceService } from 'modules/models/preference/preference.service';
import { InputType } from 'common/constants/message';
import * as assert from 'assert';

const AiServices = {
  openai: 'openAiService',
};

@Injectable()
export class AiService {
  constructor(
    private readonly preferenceService: PreferenceService,
    private readonly openAiService: OpenAiService,
  ) {
  }

  private resolveAiService(defaultAiService: string): OpenAiService {
    const ServicesMap = {
      openAiService: this.openAiService,
    };

    const aiService = ServicesMap[defaultAiService];

    assert(aiService, `AI service for ${defaultAiService} not found`);

    return aiService;
  }

  public async getAiService(inputType: InputType): Promise<OpenAiService> {
    const config = await this.preferenceService.getValue(Keys.AI_SERVICES, AiServicesSchemaDTO);

    const defaultService = AiServices[config[inputType].default];

    return this.resolveAiService(defaultService);
  }
}
