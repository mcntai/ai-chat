import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { ConfigsModule } from 'config/configs.module';
import { AuthModule } from 'authentication/auth.module';
import { ModulesModule } from 'modules/modules.module';
import { ProvidersModule } from 'providers/providers.module';
import { SeederModule } from 'database/seeders/seeder.module';

@Module({
  imports:     [
    ConfigsModule,
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
