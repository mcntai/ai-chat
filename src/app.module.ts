import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { CommonModule } from 'common/common.module';
import { DatabaseModule } from 'database/database.module';
import { AppConfigModule } from 'config/app/config.module';
import { AuthModule } from 'authentication/auth.module';
import { ModelsModule } from 'models/models.module';
import { ProvidersModule } from 'providers/providers.module';
import { MysqlDatabaseProviderModule } from 'providers/database/mysql/provider.module';

@Module({
  imports:     [
    ConfigModule.forRoot(),
    CommonModule,
    DatabaseModule,
    AppConfigModule,
    AuthModule,
    ModelsModule,
    ProvidersModule,
    MysqlDatabaseProviderModule,
  ],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {
}
