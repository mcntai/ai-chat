import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MysqlConfigModule } from 'config/database/mysql/config.module';
import { MysqlConfigService } from 'config/database/mysql/config.service';
import { join } from 'path';

@Module({
  imports:   [
    TypeOrmModule.forRootAsync({
      imports:    [MysqlConfigModule],
      useFactory: (mysqlConfigService: MysqlConfigService) => ({
        type:        'mysql' as DatabaseType,
        host:        mysqlConfigService.host,
        port:        mysqlConfigService.port,
        username:    mysqlConfigService.username,
        password:    mysqlConfigService.password,
        database:    mysqlConfigService.database,
        entities:    [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      }),
      inject:     [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
  providers: [MysqlConfigService],
  exports:   [MysqlConfigService],
})
export class MysqlDatabaseProviderModule {
}