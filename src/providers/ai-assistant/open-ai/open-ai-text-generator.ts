import { GenericHandlerInterface } from 'providers/ai-assistant/generic-handler.interface';
import { OpenAiService } from 'providers/ai-assistant/open-ai/open-ai.service';
import { Stream } from 'openai/streaming';

export class OpenAiTextGenerator extends OpenAiService implements GenericHandlerInterface {
  private readonly config: object;

  private readonly MODEL = 'gpt-3.5-turbo';
  private readonly MAX_TOKENS = 2000;
  private readonly FREQUENCY_PENALTY = 0.0;
  private readonly PRESENCE_PENALTY = 0.0;
  private readonly TOP_P = 1;
  private readonly TEMPERATURE = 1;

  constructor() {
    super();

    this.config = {
      top_p:             this.TOP_P,
      temperature:       this.TEMPERATURE,
      frequency_penalty: this.PRESENCE_PENALTY,
      presence_penalty:  this.FREQUENCY_PENALTY,
      model:             this.MODEL,
      max_tokens:        this.MAX_TOKENS,
    };
  }

  process(data: any): Promise<Stream<string>> {
    return super.communicate(data, this.config);
  }
}