import { Module } from '@nestjs/common';
import { MysqlConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [MysqlConfigService],
  exports:   [MysqlConfigService],
})
export class MysqlConfigModule {
}
