import { Injectable } from '@nestjs/common';
import { Keys } from 'modules/models/preference/preference.entity';
import { PreferenceService } from 'modules/models/preference/preference.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly preferenceService: PreferenceService,
  ) {
  }

  async seed() {
    try {
      await this.seedPreferences();

      console.log('Seeding completed successfully...');
    } catch (error) {
      console.log('Seeding failed...');

      throw error;
    }
  }

  async seedPreferences(): Promise<void> {
    const configDto = {
      active: {
        textGenerator:  'OpenAiTextGenerator',
        imageGenerator: 'OpenAiImageGenerator',
        imageScanner:   'OpenAiImageScanner',
      },
      all:    {
        textGenerator:  ['OpenAiTextGenerator'],
        imageGenerator: ['OpenAiImageGenerator'],
        imageScanner:   ['OpenAiImageScanner'],
      },
    };

    const config = await this.preferenceService.getValue(Keys.AI_HANDLERS);

    if (!config) {
      await this.preferenceService.set(Keys.AI_HANDLERS, configDto);
    }
  }
}