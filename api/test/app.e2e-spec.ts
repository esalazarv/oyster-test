import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';

describe('AppController (e2e)', () => {
  let connection: Connection;
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
    connection = moduleFixture.get<Connection>(Connection);
    await app.init();
    await connection.synchronize(true);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('/ (GET)', () => {
    const response = {
      name: 'Oyster',
      version: '1.0.0',
    };
    return request(app.getHttpServer()).get('/').expect(200).expect(response);
  });
});
