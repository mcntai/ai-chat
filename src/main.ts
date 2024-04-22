import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { AppConfigService } from 'config/app/config.service';
import { GlobalErrorFilter } from 'common/errors/errors.filter';
import { SeederService } from 'database/seeders/seeder.service';
import { SitoPatchingModule } from 'common/errors/schema-validator/patch';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SitoPatchingModule.patch();

  app.useGlobalFilters(new GlobalErrorFilter());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const appConfig: AppConfigService = app.get(AppConfigService);
  const seeder = app.get(SeederService);

  await seeder.seed();

  await app.listen(appConfig.port).then(() => {
    console.log(`Server started on ${appConfig.url}`);
  });
}

bootstrap();
