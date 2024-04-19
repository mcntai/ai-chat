import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { AppConfigModule } from 'config/app/config.module';
import { DatabaseConfigModule } from 'config/database/database.module';
import { FsConfigModule } from 'config/fs/fs.module';
import { AuthModule } from 'authentication/auth.module';
import { ModulesModule } from 'modules/modules.module';
import { ProvidersModule } from 'providers/providers.module';
import { SeederModule } from 'database/seeders/seeder.module';

@Module({
  imports:     [
    ConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
    DatabaseConfigModule,
    FsConfigModule,
    ModulesModule,
    AuthModule,
    ProvidersModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {
}
