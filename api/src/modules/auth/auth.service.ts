import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { AccessToken } from './entities/accces-token.entity';
import { User } from '../users/entities/user.entity';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(username: string, password: string): Promise<User | null> {
    const user: User = await this.usersService.findByUsername(username);
    if (!(await user.checkPassword(password))) {
      return null;
    }
    return user;
  }

  async generateAccessToken(user: User): Promise<AccessToken> {
    const payload: JwtPayloadInterface = { id: user.id };
    const accessToken: AccessToken = new AccessToken();
    accessToken.access_token = this.jwtService.sign(payload);
    accessToken.access_type = 'Bearer';
    return accessToken;
  }
}
