import { OpenAI } from 'openai';
import * as assert from 'assert';

export class OpenAiImageService {
  private readonly DEFAULT_NUMBER_OF_VARIATIONS = 1;
  private readonly DEFAULT_SIZE = '1024x1024';
  private readonly DEFAULT_RESPONSE_FORMAT = 'url';

  constructor(private readonly openai: OpenAI) {
  }

  async create(query: string, size, variations): Promise<string> {
    const url = await this.openai.images.generate({
      prompt:          query,
      size:            size || this.DEFAULT_SIZE,
      n:               variations || this.DEFAULT_NUMBER_OF_VARIATIONS,
      response_format: this.DEFAULT_RESPONSE_FORMAT,
    })
      .catch(err => {
        throw new Error(err);
      })
      .then(response => response.data?.[0]?.url);

    assert(url, 'Request to OpenAI failed. No image URL was returned');

    return url;
  }
}