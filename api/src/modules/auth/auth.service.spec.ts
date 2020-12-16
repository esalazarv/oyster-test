import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/repositories/user.repository';
import { AccessToken } from './entities/accces-token.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
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
      providers: [AuthService, UsersService, UserRepository],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should authenticate user with valid credentials', async () => {
    const user = new User();
    user.email = 'eduardo@test.com';
    user.password = await bcrypt.hash('secret', 10);
    jest.spyOn(userService, 'findByUsername').mockImplementation(async () => {
      return user;
    });
    expect(
      await service.authenticate('eduardo@test.com', 'secret'),
    ).toBeInstanceOf(User);
  });

  it('should return null with invalid credentials', async () => {
    const user = new User();
    user.email = 'carlos@test.com';
    user.password = await bcrypt.hash('secret', 10);
    jest.spyOn(userService, 'findByUsername').mockImplementation(async () => {
      return user;
    });
    expect(await service.authenticate('eduardo@test.com', 'badpassword')).toBe(
      null,
    );
  });

  it('should generate an access token for given user', async () => {
    const user = new User();
    user.id = 5;
    user.email = 'admin@test.com';
    jest.spyOn(jwtService, 'sign').mockImplementation(() => 'access_token');
    const accessToken = await service.generateAccessToken(user);
    expect(accessToken).toBeInstanceOf(AccessToken);
    expect(accessToken.access_type).toEqual('Bearer');
    expect(accessToken.access_token).toEqual('access_token');
    expect(jwtService.sign).toBeCalledWith({ id: user.id });
  });
});
