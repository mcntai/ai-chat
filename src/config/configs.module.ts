import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from 'config/app/configuration';
import minioConfiguration from 'config/fs/minio/configuration';
import mysqlConfiguration from 'config/database/mysql/configuration';
import { AppConfigService } from 'config/app/config.service';
import { MinioConfigService } from 'config/fs/minio/config.service';
import { MysqlConfigService } from 'config/database/mysql/config.service';
import * as path from 'path';
import * as Joi from 'joi';

export enum Environment {
  dev = 'dev',
  sandbox = 'sandbox',
  live = 'live',
  test = 'test',
}

const ENV = process.env.NODE_ENV;

@Module({
  imports:   [
    ConfigModule.forRoot({
      isGlobal:         true,
      load:             [appConfiguration, minioConfiguration, mysqlConfiguration],
      envFilePath:      path.resolve(process.cwd(), Environment[ENV] ? `env/.env.${Environment[ENV]}` : 'env/.env'),
      validationSchema: Joi.object({
        APP_URL:             Joi.string().required(),
        APP_PORT:            Joi.number().port().required(),
        JWT_SECRET:          Joi.string().required(),
        JWT_EXPIRES_IN:      Joi.string().required(),
        MYSQL_HOST:          Joi.string().required(),
        MYSQL_PORT:          Joi.number().port().required(),
        MYSQL_USERNAME:      Joi.string().required(),
        MYSQL_PASSWORD:      Joi.string().required(),
        MYSQL_DATABASE:      Joi.string().required(),
        MYSQL_SYNCHRONIZE:   Joi.string().required(),
        MYSQL_LOGGING:       Joi.string().required(),
        MYSQL_ENTITIES_PATH: Joi.string().required(),
        MINIO_BUCKET:        Joi.string().required(),
        MINIO_HOST:          Joi.string().required(),
        MINIO_PORT:          Joi.number().port().required(),
        MINIO_ACCESS_KEY:    Joi.string().required(),
        MINIO_SECRET_KEY:    Joi.string().required(),
        OPENAI_API_KEY:      Joi.string().required(),
      }),
    }),
  ],
  providers: [AppConfigService, MinioConfigService, MysqlConfigService],
  exports:   [AppConfigService, MinioConfigService, MysqlConfigService],
})
export class ConfigsModule {
}