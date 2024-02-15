import { Module } from '@nestjs/common';
import { MysqlConfigModule } from './mysql/config.module';

@Module({
  imports: [MysqlConfigModule],
})
export class DatabaseModule {}
