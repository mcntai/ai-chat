import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:   [
    ConfigModule.forRoot({
      load:     [configuration],
    }),
  ],
  providers: [AppConfigService],
  exports:   [AppConfigService],
})
export class AppConfigModule {
}