import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app/configuration.module';
import { ModelsModule } from './models/models.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [CommonModule, DatabaseModule, AppConfigModule, ModelsModule, ProvidersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
