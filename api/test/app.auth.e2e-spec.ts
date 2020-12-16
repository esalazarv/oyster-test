import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';

describe('AuthController (e2e)', () => {
  let connection: Connection;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get<Connection>(Connection);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.init();
  });

  afterEach(async () => {
    await connection.close();
  });

  it('/auth/login (POST)', async () => {
    const credentials = {
      username: 'admin@oyster.com',
      password: 'secret',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(201)
      .then(async (response) => {
        expect(response.body).toHaveProperty('access_token');
        expect(response.body).toHaveProperty('access_type');
      });
  });

  it('/auth/login (POST) [Bad request]', async () => {
    const credentials = {
      username: 'admin@oyster.com',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
      });
  });

  it('/auth/login (POST) [Unauthorized]', async () => {
    const credentials = {
      username: 'admin@oyster.com',
      password: 'wrong_password',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(401);
  });
});
