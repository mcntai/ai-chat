import { Inject } from '@nestjs/common';
import { AppConfigService } from 'config/app/config.service';
import { Message } from 'modules/models/message/message.entity';
import { AiAssistantInterface } from 'providers/ai-assistant/ai-assistant.interface';
import { TextExtractorStream } from 'providers/ai-assistant/open-ai/text-extractor-stream';
import { ChatCompletionChunk } from 'openai/resources/chat/completions';
import { IntegrationError, InternalServerError } from 'common/errors';
import { OPEN_AI_IMAGE_RESOLUTION, ACTOR } from 'common/constants/message';
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
  private readonly IMAGE_GENERATION_MODEL = 'dall-e-2';
  private readonly IMAGE_RECOGNITION_MODEL = 'gpt-4-vision-preview';
  private readonly IMAGE_RECOGNITION_TEXT_TYPE = 'text';
  private readonly IMAGE_RECOGNITION_IMAGE_URL_TYPE = 'image_url';
  private readonly DEFAULT_RESPONSE_FORMAT = 'url';
  private readonly RECOGNITION_MODEL_TOKENS_COUNT = 300;
  private readonly MIN_HISTORY_LENGTH = 3;

  private openai: OpenAI;

  @Inject(AppConfigService)
  private readonly configService: AppConfigService;

  constructor() {
    // this.openai = new OpenAI({ apiKey: this.configService.openAiApiKey });
    this.openai = new OpenAI({ apiKey: openAiApiKey });
  }

  async communicate(messages: Partial<Message>[], config: any): Promise<Stream<string>> {
    const systemMessage: Partial<Message> = {
      text:  'You are a helpful assistant. Respond in the language of user question.',
      actor: ACTOR.SYSTEM,
    };

    messages.unshift(systemMessage);

    const { top_p, temperature, frequency_penalty, presence_penalty, model, max_tokens } = config;

    try {
      const openaiStream: Stream<ChatCompletionChunk> = await this.openai.chat.completions.create({
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

      return new TextExtractorStream(openaiStream, chunk => chunk.choices[0]?.delta?.content);
    } catch (error) {
      throw new InternalServerError('Streaming failed: ' + error.stack);
    }
  }

  async generateImage(prompt: string, size: OPEN_AI_IMAGE_RESOLUTION, model, variations): Promise<string> {
    const url = await this.openai.images.generate({
      model,
      prompt,
      size,
      n: variations,

      response_format: this.DEFAULT_RESPONSE_FORMAT,
    })
      .catch(err => {
        throw new IntegrationError('Failed to generate image via OpenAi: ' + err.message);
      })
      .then(response => response.data?.[0]?.url);

    assert(url, 'Request to OpenAI failed. No image URL was returned');

    return url;
  }

  // async recognizeImage(prompt: string, imageUrl: string, pipe: (str: string) => void): Promise<string> {
  //   const stream = await this.openai.chat.completions.create({
  //     stream:     true,
  //     model:      this.IMAGE_RECOGNITION_MODEL,
  //     max_tokens: this.RECOGNITION_MODEL_TOKENS_COUNT,
  //
  //     messages: [
  //       {
  //         role:    Actor.USER,
  //         content: [
  //           { type: this.IMAGE_RECOGNITION_TEXT_TYPE, text: prompt },
  //           { type: this.IMAGE_RECOGNITION_IMAGE_URL_TYPE, image_url: { url: imageUrl } },
  //         ],
  //       },
  //     ],
  //   }).catch(err => {
  //     throw new IntegrationError('Failed to recognize image via OpenAi: ' + err.stack);
  //   });
  //
  //   return this.handleStream(stream, chunk => chunk.choices[0], pipe);
  // }
}
