import { Module } from '@nestjs/common';
import { MinioConfigModule } from './minio/config.module';
import { MinioConfigService } from 'config/fs/minio/config.service';

@Module({
  imports: [MinioConfigModule],
  providers: [MinioConfigService],
  exports: [MinioConfigService],
})
export class FsConfigModule {
}
