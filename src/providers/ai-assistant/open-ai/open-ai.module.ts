import { Module } from '@nestjs/common';
import { OpenAiService } from 'providers/ai-assistant/open-ai/open-ai.service';
import { AppConfigModule } from 'config/app/config.module';

@Module({
  imports:   [AppConfigModule],
  providers: [OpenAiService],
  exports:   [OpenAiService],
})
export class OpenAiModule {
}