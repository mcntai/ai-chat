import { Module } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preference } from 'modules/models/preference/preference.entity';
import { PreferenceRepository } from 'modules/models/preference/preference.repository';

@Module({
  imports:   [TypeOrmModule.forFeature([Preference])],
  providers: [PreferenceService, PreferenceRepository],
  exports:   [PreferenceService],
})
export class PreferenceModule {
}
