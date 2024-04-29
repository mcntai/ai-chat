import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigsModule } from 'config/configs.module';
import { MysqlConfigService } from 'config/database/mysql/config.service';
import { join } from 'path';

@Module({
  imports:   [
    TypeOrmModule.forRootAsync({
      imports:    [ConfigsModule],
      useFactory: (config: MysqlConfigService) => ({
        type:        'mysql' as DatabaseType,
        host:        config.host,
        port:        config.port,
        username:    config.username,
        password:    config.password,
        database:    config.database,
        entities:    [join(process.cwd(), config.entitiesPath)],
        synchronize: config.synchronize,
        logging:     config.logging,
      }),
      inject:     [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
  providers: [MysqlConfigService],
  exports:   [MysqlConfigService],
})
export class MysqlDatabaseProviderModule {
}