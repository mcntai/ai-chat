import { AppModule } from 'app.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

export default async function(): Promise<INestApplication> {
  if (!app) {
    const testModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testModule.createNestApplication();

    await app.init();
  }

  return app;
}