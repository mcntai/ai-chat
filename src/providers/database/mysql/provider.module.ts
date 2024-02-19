import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MysqlConfigModule } from 'config/database/mysql/config.module';
import { MysqlConfigService } from 'config/database/mysql/config.service';
import { AppConfigModule } from 'config/app/config.module';
import { join } from 'path';

@Module({
  imports:   [
    TypeOrmModule.forRootAsync({
      imports:    [AppConfigModule, MysqlConfigModule],
      useFactory: (mysqlConfigService: MysqlConfigService) => ({
        type:     'mysql' as DatabaseType,
        host:     mysqlConfigService.host,
        port:     mysqlConfigService.port,
        username: mysqlConfigService.username,
        password: mysqlConfigService.password,
        database: mysqlConfigService.database,
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      }),
      inject:     [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
  providers: [MysqlConfigService],
  exports:   [MysqlConfigService],
})
export class MysqlDatabaseProviderModule {
}