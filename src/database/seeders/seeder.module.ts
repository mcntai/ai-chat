import { Module } from '@nestjs/common';
import { MysqlDatabaseProviderModule } from 'providers/database/mysql/provider.module';
import { SeederService } from 'database/seeders/seeder.service';
import { PreferenceModule } from 'modules/models/preference/preference.module';

@Module({
  imports: [MysqlDatabaseProviderModule, PreferenceModule],
  providers: [SeederService],
})
export class SeederModule {
}
