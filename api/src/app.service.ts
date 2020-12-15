import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getInfo(): Record<string, string> {
    return {
      name: this.config.get('app.name'),
      version: this.config.get('app.version'),
    };
  }
}
