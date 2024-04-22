import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { AppConfigService } from 'config/app/config.service';
import { GlobalErrorFilter } from 'common/errors/errors.filter';
import { SeederService } from 'database/seeders/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalErrorFilter());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const appConfig: AppConfigService = app.get(AppConfigService);
  const seeder = app.get(SeederService);

  await seeder.seed();

  const options = new DocumentBuilder()
    .setTitle('Chat API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  delete document.paths['/'];

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(appConfig.port).then(() => {
    console.log(`Server started on ${appConfig.url}`);
  });
}

bootstrap();
