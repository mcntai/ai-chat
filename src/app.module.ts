import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { CommonModule } from 'common/common.module';
import { DatabaseModule } from 'database/database.module';
import { AppConfigModule } from 'config/app/config.module';
import { AuthModule } from 'authentication/auth.module';
import { ModulesModule } from 'modules/modules.module';
import { ProvidersModule } from 'providers/providers.module';

@Module({
  imports:     [
    ConfigModule.forRoot(),
    AppConfigModule,
    ModulesModule,
    CommonModule,
    AuthModule,
    ProvidersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {
}
