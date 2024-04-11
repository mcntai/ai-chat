import { Module } from '@nestjs/common';
import { MysqlDatabaseProviderModule } from './database/mysql/provider.module';
import { FsModule } from 'providers/fs/fs.module';
import { AiAssistantModule } from 'providers/ai-assistant/ai-assistant.module';

@Module({
  imports: [MysqlDatabaseProviderModule, FsModule, AiAssistantModule],
  exports: [MysqlDatabaseProviderModule, FsModule, AiAssistantModule],
})
export class ProvidersModule {
}
