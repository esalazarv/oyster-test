import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/repositories/user.repository';

describe('AuthController', () => {
  let controller: AuthController;

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
      providers: [AuthService, UsersService, UserRepository],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
