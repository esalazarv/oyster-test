import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  name: process.env.APP_NAME || 'App',
  version: process.env.APP_VERSION || '1.0.0',
  port: process.env.APP_PORT || 80,
}));
