import { Module } from '@nestjs/common';
import { MysqlDatabaseProviderModule } from './database/mysql/provider.module';
import { MinioClientModule } from 'providers/fs/minio/minio-client.module';

@Module({
  imports:   [MysqlDatabaseProviderModule, MinioClientModule],
  exports:   [MysqlDatabaseProviderModule, MinioClientModule],
})
export class ProvidersModule {
}
