import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './minio-client.service';
import { MinioConfigModule } from 'config/fs/minio/config.module';
import { MinioConfigService } from 'config/fs/minio/config.service';

@Module({
  imports:   [
    MinioModule.registerAsync({
      imports:    [MinioConfigModule],
      inject:     [MinioConfigService],
      useFactory: (configService: MinioConfigService) => ({
        useSSL:    true,
        endPoint:  configService.host,
        port:      configService.port,
        accessKey: configService.accessKey,
        secretKey: configService.secretKey,
      }),
    }),
  ],
  providers: [MinioClientService, MinioConfigService],
  exports:   [MinioClientService],
})
export class MinioClientModule {
}
