import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { AccessToken } from './entities/accces-token.entity';
import { User } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) =>
            configService.get('jwt'),
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, UsersService, UserRepository, ConfigService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should authenticate user with valid credentials', async () => {
    const credentials: LoginDto = {
      username: 'eduardo@test.com',
      password: 'secret',
    };
    const user = new User();
    user.id = 7;
    user.password = await bcrypt.hash('secret', 10);
    user.email = 'eduardo@test.com';
    jest
      .spyOn(authService, 'authenticate')
      .mockImplementation(async () => user);
    jest
      .spyOn(jwtService, 'sign')
      .mockImplementation(() => 'generated_access_token');
    const accessToken = await controller.login(credentials);
    expect(accessToken).toBeInstanceOf(AccessToken);
    expect(accessToken).toEqual({
      access_token: 'generated_access_token',
      access_type: 'Bearer',
      expires: 3600,
    });
  });

  it('should throw exception for invalid credentials', async () => {
    const credentials: LoginDto = {
      username: 'eduardo@test.com',
      password: 'secret',
    };
    jest
      .spyOn(authService, 'authenticate')
      .mockImplementation(async () => null);
    jest
      .spyOn(jwtService, 'sign')
      .mockImplementation(() => 'generated_access_token');
    try {
      await controller.login(credentials);
    } catch (exception) {
      expect(exception).toBeInstanceOf(UnauthorizedException);
      expect(exception.message).toEqual('Unauthorized');
    }
  });
});
