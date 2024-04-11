import { Module } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { PreferenceModule } from 'modules/models/preference/preference.module';
import { OpenAiModule } from 'providers/ai-assistant/open-ai/open-ai.module';

@Module({
  imports:   [PreferenceModule, OpenAiModule],
  providers: [AiAssistantService],
  exports:   [AiAssistantService],
})
export class AiAssistantModule {
}
