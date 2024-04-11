import { GenericHandlerInterface } from 'providers/ai-assistant/generic-handler.interface';
import { OpenAiService } from 'providers/ai-assistant/open-ai/open-ai.service';

export class OpenAiImageGenerator extends OpenAiService implements GenericHandlerInterface {
  private readonly config: object;

  private readonly MODEL = 'dall-e-2';
  private readonly COUNT = 1;

  process(data: any): Promise<string> {
    return super.generateImage(data.text, data.size, this.MODEL, this.COUNT);
  }
}