import { Test, TestingModule } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'typeorm';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let connection: Connection;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [ConfigService],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get<Connection>(Connection);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.init();
    await connection.synchronize(true);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('/users (GET)', () => {
    const response = [];
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(response);
  });

  it('/users (POST)', () => {
    const data = {
      name: 'Eduardo',
      email: 'email@test.com',
      password: 'secret',
      password_confirm: 'secret',
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(data)
      .expect(201)
      .then(async (response) => {
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual('Eduardo');
        expect(response.body.email).toEqual('email@test.com');
        expect(response.body.password).toBeUndefined();
      });
  });
});
