import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfig } from './app.config';
import { DatabaseConfig, ResolveConnectionConfig } from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        ResolveConnectionConfig(config.get('database.default')),
      inject: [ConfigService],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}
