import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

import { OpenAiImageService } from './services/image.service';
import { OpenAiTextService } from './services/text.service';
import { AppConfigService } from 'config/app/config.service';

@Injectable()
export class OpenAiService {
  public openai: OpenAI;

  public imageService: OpenAiImageService;
  public textService: OpenAiTextService;

  constructor(private readonly configService: AppConfigService) {
    this.openai = new OpenAI({ apiKey: configService.openAiApiKey });

    this.imageService = new OpenAiImageService(this.openai);
    this.textService = new OpenAiTextService(this.openai);
  }
}