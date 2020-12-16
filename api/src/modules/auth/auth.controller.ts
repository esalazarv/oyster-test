import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AccessToken } from './entities/accces-token.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AccessToken> {
    const { username, password } = loginDto;
    const user = await this.authService.authenticate(username, password);
    if (!user) {
      throw new UnauthorizedException('Unauthorized', 'Invalid credentials');
    }
    return await this.authService.generateAccessToken(user);
  }
}
