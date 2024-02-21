import { Module } from '@nestjs/common';
import { MysqlDatabaseProviderModule } from './database/mysql/provider.module';

@Module({
  imports: [MysqlDatabaseProviderModule],
  providers: [MysqlDatabaseProviderModule],
})
export class ProvidersModule {
}
