import { OpenAI } from 'openai';
import { argumentsAssert, InternalServerError } from 'common/errors';
import { Actor, Message } from 'modules/models/message/message.entity';

export class OpenAiTextService {
  private readonly DEFAULT_COMPLETION_MODEL = 'gpt-3.5-turbo';
  constructor(private readonly openai: OpenAI) {
  }

  async textCompletion(input: string, messages: Partial<Message>[], pipe: (str: string) => void): Promise<string> {
    try {
      const stream = await this.openai.chat.completions.create({
        model:    this.DEFAULT_COMPLETION_MODEL,
        messages: [
          ...messages.map(msg => ({
            role:    msg.actor,
            content: msg.text,
          })),
          { role: Actor.USER, content: input },
        ],
        stream:   true,
      });

      const response: string[] = [];

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';

        pipe(content);
        response.push(content);
      }

      return response.join('');
    } catch (error) {
      throw new InternalServerError('Streaming failed: ' + error.stack);
    }
  }

  async moderateInput(message: string): Promise<boolean> {
    const moderationPassed = await this.openai.moderations.create({ input: message })
      .then(response => response.results?.[0]?.flagged);

    argumentsAssert(moderationPassed, 'Message contains inappropriate content');

    return moderationPassed;
  }
}