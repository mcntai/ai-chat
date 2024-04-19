import { Message } from 'modules/models/message/message.entity';
import { Stream } from 'openai/streaming';
import { OPEN_AI_IMAGE_RESOLUTION } from 'common/constants/message';

export interface AiAssistantInterface {
  communicate(messages: Partial<Message>[], config: object): Promise<Stream<string | null>>;

  generateImage(prompt: string, size: OPEN_AI_IMAGE_RESOLUTION, model, variations): Promise<string>;

  recognizeImage(body: object): Promise<Stream<string>>;

  getConfig(): any;
}