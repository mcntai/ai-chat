import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './minio-client.service';
import { ConfigsModule } from 'config/configs.module';
import { MinioConfigService } from 'config/fs/minio/config.service';

@Module({
  imports:   [
    MinioModule.registerAsync({
      imports:    [ConfigsModule],
      inject:     [MinioConfigService],
      useFactory: (config: MinioConfigService) => ({
        useSSL:    true,
        endPoint:  config.host,
        port:      config.port,
        accessKey: config.accessKey,
        secretKey: config.secretKey,
      }),
    }),
  ],
  providers: [MinioClientService, MinioConfigService],
  exports:   [MinioClientService],
})
export class MinioClientModule {
}
