import { GenericHandlerInterface } from 'providers/ai-assistant/generic-handler.interface';
import { OpenAiService } from 'providers/ai-assistant/open-ai/open-ai.service';
import * as assert from 'assert';

export class OpenAiImageGenerator extends OpenAiService implements GenericHandlerInterface {
  private readonly MODEL = 'dall-e-2';
  private readonly COUNT = 1;

  process(data: any): Promise<string> {
    assert(data.prompt, 'prompt is required');
    assert(data.size, 'size is required');

    return super.generateImage({
      model:      this.MODEL,
      variations: this.COUNT,
      prompt:     data.prompt,
      size:       data.size,
    });
  }
}