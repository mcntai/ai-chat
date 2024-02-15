import { Module } from '@nestjs/common';
import { Database } from './database/database';

@Module({
  providers: [Database],
})
export class ProvidersModule {
}
