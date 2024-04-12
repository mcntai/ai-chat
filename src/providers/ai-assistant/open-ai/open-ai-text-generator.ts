import { GenericHandlerInterface } from 'providers/ai-assistant/generic-handler.interface';
import { OpenAiService } from 'providers/ai-assistant/open-ai/open-ai.service';
import { Stream } from 'openai/streaming';
import * as assert from 'assert';

export class OpenAiTextGenerator extends OpenAiService implements GenericHandlerInterface {
  private readonly MODEL = 'gpt-3.5-turbo';
  private readonly MAX_TOKENS = 2000;
  private readonly FREQUENCY_PENALTY = 0.0;
  private readonly PRESENCE_PENALTY = 0.0;
  private readonly TOP_P = 1;
  private readonly TEMPERATURE = 1;

  process(data: any): Promise<Stream<string>> {
    assert(data.messages, 'messages are required');

    return super.communicate({
      top_p:             this.TOP_P,
      model:             this.MODEL,
      max_tokens:        this.MAX_TOKENS,
      temperature:       this.TEMPERATURE,
      presence_penalty:  this.PRESENCE_PENALTY,
      frequency_penalty: this.FREQUENCY_PENALTY,
      messages:          data.messages,
    });
  }
}