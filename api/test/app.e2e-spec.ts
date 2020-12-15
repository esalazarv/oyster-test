import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockedConfigService = {
    get(key: string) {
      switch (key) {
        case 'app.name':
          return 'Oyster';
        case 'app.version':
          return '1.0.0';
      }
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const response = {
      name: 'Oyster',
      version: '1.0.0',
    };
    return request(app.getHttpServer()).get('/').expect(200).expect(response);
  });
});
