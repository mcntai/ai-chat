import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { DatabaseModule } from 'database/database.module';
import { AppConfigModule } from 'config/app/config.module';
import { DatabaseConfigModule } from 'config/database/database.module';
import { FsConfigModule } from 'config/fs/fs.module';
import { AuthModule } from 'authentication/auth.module';
import { ModulesModule } from 'modules/modules.module';
import { ProvidersModule } from 'providers/providers.module';

@Module({
  imports:     [
    ConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
    DatabaseConfigModule,
    FsConfigModule,
    ModulesModule,
    AuthModule,
    ProvidersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {
}
