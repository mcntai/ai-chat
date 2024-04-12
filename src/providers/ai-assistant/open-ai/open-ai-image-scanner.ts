import { GenericHandlerInterface } from 'providers/ai-assistant/generic-handler.interface';
import { OpenAiService } from 'providers/ai-assistant/open-ai/open-ai.service';
import { ACTOR } from 'common/constants/message';
import * as assert from 'assert';
import { Stream } from 'openai/streaming';

const LANGUAGE_PLACEHOLDER = '$LANGUAGE';

export class OpenAiImageScanner extends OpenAiService implements GenericHandlerInterface {
  private readonly MODEL = 'gpt-4-vision-preview';
  private readonly TEXT_TYPE = 'text';
  private readonly IMAGE_TYPE = 'image_url';
  private readonly MAX_TOKENS = 300;
  private readonly DEFAULT_PROMPT = `If there is text on the picture, 
  then first write what language the text is written in, and then the text itself. 
  If there is no text on the image, answer briefly what is shown in the picture. 
  The answer is in ${LANGUAGE_PLACEHOLDER} language.`;

  process(data): Promise<Stream<string>> {
    assert(data.imageUrl, 'image url is required');
    assert(data.language, 'language is required');

    const { imageUrl, prompt, language } = data;

    return super.recognizeImage({
      stream:     true,
      model:      this.MODEL,
      max_tokens: this.MAX_TOKENS,

      messages: [
        {
          role:    ACTOR.USER,
          content: [
            { type: this.TEXT_TYPE, text: prompt || this.DEFAULT_PROMPT.replace(LANGUAGE_PLACEHOLDER, language) },
            { type: this.IMAGE_TYPE, image_url: { url: imageUrl } },
          ],
        },
      ],
    });
  }
}