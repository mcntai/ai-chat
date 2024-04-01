import { Module } from '@nestjs/common';
import { MinioConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports:   [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [MinioConfigService],
  exports:   [MinioConfigService],
})
export class MinioConfigModule {
}
