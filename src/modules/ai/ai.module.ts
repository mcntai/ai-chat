import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { PreferenceModule } from 'modules/models/preference/preference.module';
import { OpenAiModule } from 'api-services/open-ai/open-ai.module';

@Module({
  imports: [PreferenceModule, OpenAiModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {
}
