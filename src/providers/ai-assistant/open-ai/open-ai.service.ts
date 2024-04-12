import { Inject } from '@nestjs/common';
import { AppConfigService } from 'config/app/config.service';
import { Message } from 'modules/models/message/message.entity';
import { AiAssistantInterface } from 'providers/ai-assistant/ai-assistant.interface';
import { TextExtractorStream } from 'providers/ai-assistant/open-ai/text-extractor-stream';
import { ChatCompletionChunk } from 'openai/resources/chat/completions';
import { ACTOR } from 'common/constants/message';
import { countTokensFromString } from 'common/utils/open-ai';
import { OpenAI } from 'openai';
import { Stream } from 'openai/streaming';
import { TiktokenModel } from 'tiktoken';
import * as assert from 'assert';

const MIN_HISTORY_LENGTH = 3;

const halveText = (text: string) => {
  return text.slice(0, Math.floor(text.length / 2));
};

const trimMinRequiredMessages = (messages: Partial<Message>[]) => {
  const systemMessage = messages[0];
  const aiMessage = messages[1];
  const userMessage = messages[2];

  return [
    systemMessage,
    { ...aiMessage, text: halveText(aiMessage.text) },
    { ...userMessage, text: halveText(userMessage.text) },
  ];
};

const reduceHistory = (messages: Partial<Message>[], model: TiktokenModel, tokensLimit: number): Partial<Message>[] => {
  const tokensCount = countTokensFromString(messages.map(msg => msg.text).join(' '), model);

  if (tokensCount >= tokensLimit) {
    if (messages.length === MIN_HISTORY_LENGTH) {
      return reduceHistory(trimMinRequiredMessages(messages), model, tokensLimit);
    }

    messages.splice(1, 1);

    return reduceHistory(messages, model, tokensLimit);
  }

  return messages;
};

const openAiApiKey = 'secret';

export class OpenAiService implements AiAssistantInterface {
  private readonly IMAGE_GENERATION_RESPONSE_FORMAT = 'url';

  private openai: OpenAI;

  @Inject(AppConfigService)
  private readonly configService: AppConfigService;

  constructor() {
    // this.openai = new OpenAI({ apiKey: this.configService.openAiApiKey });
    this.openai = new OpenAI({ apiKey: openAiApiKey });
  }

  async communicate(body): Promise<Stream<string>> {
    const { top_p, temperature, frequency_penalty, presence_penalty, model, max_tokens, messages } = body;

    const systemMessage: Partial<Message> = {
      text:  'You are a helpful assistant. Respond in the language of user question.',
      actor: ACTOR.SYSTEM,
    };

    messages.unshift(systemMessage);

    try {
      const stream: Stream<ChatCompletionChunk> = await this.openai.chat.completions.create({
        top_p,
        model,
        max_tokens,
        temperature,
        presence_penalty,
        frequency_penalty,
        stream: true,

        messages: reduceHistory(messages, model, max_tokens).map(msg => ({
          role:    msg.actor,
          content: msg.text,
        })),
      });

      return new TextExtractorStream(stream, chunk => chunk.choices[0]?.delta?.content);
    } catch (e) {
      throw new Error('Failed to generate text via OpenAi: ' + e.message);
    }
  }

  async generateImage(body): Promise<string> {
    const { model, prompt, size, variations } = body;

    const url = await this.openai.images.generate({
      model,
      prompt,
      size,
      n: variations,

      response_format: this.IMAGE_GENERATION_RESPONSE_FORMAT,
    })
      .catch(err => {
        throw new Error('Failed to generate image via OpenAi: ' + err.message);
      })
      .then(response => response.data?.[0]?.url);

    assert(url, 'Request to OpenAI failed. No image URL was returned');

    return url;
  }

  async recognizeImage(body): Promise<Stream<string>> {
    const { model, max_tokens, messages } = body;

    try {
      const stream = await this.openai.chat.completions.create({
        model,
        max_tokens,
        messages,
        stream: true,
      });

      return new TextExtractorStream(stream, chunk => chunk.choices[0]?.delta?.content);
    } catch (e) {
      throw new Error('Failed to recognize image via OpenAi: ' + e.stack);
    }
  }
}
