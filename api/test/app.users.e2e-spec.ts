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
import { AccessToken } from '../src/modules/auth/entities/accces-token.entity';
import { AuthService } from '../src/modules/auth/auth.service';
import { User } from '../src/modules/users/entities/user.entity';

describe('UserController (e2e)', () => {
  let connection: Connection;
  let app: INestApplication;
  let token: AccessToken;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [ConfigService],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get<Connection>(Connection);
    authService = moduleFixture.get<AuthService>(AuthService);

    const user = new User();
    user.id = 1;
    token = await authService.generateAccessToken(user);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.init();
  });

  afterEach(async () => {
    await connection.close();
  });

  it('/users (GET)', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `${token.access_type} ${token.access_token}`)
      .expect(200)
      .then(async (response) => {
        expect(response.body.length).toEqual(1);
        expect(response.body[0].name).toEqual('Admin');
        expect(response.body[0].email).toEqual('admin@oyster.com');
      });
  });

  it('/users (POST)', async () => {
    const data = {
      name: 'Eduardo',
      email: 'email@test.com',
      password: 'secret',
      password_confirm: 'secret',
    };
    return await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `${token.access_type} ${token.access_token}`)
      .send(data)
      .expect(201)
      .then(async (response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toEqual('Eduardo');
        expect(response.body.email).toEqual('email@test.com');
        expect(response.body.password).toBeUndefined();
      });
  });
});
