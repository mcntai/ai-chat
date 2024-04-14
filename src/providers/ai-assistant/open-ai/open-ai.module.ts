import { Module } from '@nestjs/common';
import { OpenAiService } from 'providers/ai-assistant/open-ai/open-ai.service';

@Module({
  imports:   [],
  providers: [OpenAiService],
  exports:   [OpenAiService],
})
export class OpenAiModule {
}