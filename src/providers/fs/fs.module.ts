import { Module } from '@nestjs/common';
import { FsService } from 'providers/fs/fs.service';
import { MinioClientModule } from 'providers/fs/minio/minio-client.module';

@Module({
  imports:   [MinioClientModule],
  providers: [FsService],
  exports:   [FsService],
})
export class FsModule {
}