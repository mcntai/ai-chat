import { Module } from '@nestjs/common';
import { MysqlConfigModule } from './mysql/config.module';
import { MysqlConfigService } from 'config/database/mysql/config.service';

@Module({
  imports: [MysqlConfigModule],
  providers: [MysqlConfigService],
})
export class DatabaseConfigModule {}
