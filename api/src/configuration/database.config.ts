import { registerAs } from '@nestjs/config';

export const Connections = () => ({
  default: process.env.DB_CONNECTION || 'sqlite',
  sqlite: {
    name: 'default',
    type: 'sqlite',
    database: process.env.DB_DATABASE
      ? process.env.DB_DATABASE + `.sqlite`
      : 'oyster.sqlite',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    logging: true,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    keepConnectionAlive: true,
    autoLoadEntities: true,
  },
  test: {
    name: 'test',
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    dropSchema: true,
    synchronize: false,
    migrationsRun: true,
    logging: false,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    keepConnectionAlive: false,
    autoLoadEntities: true,
  },
  // Add another database configurations like MySQL
});

export const DatabaseConfig = registerAs('database', Connections);

export const ResolveConnectionConfig = (name?: string) => {
  const connections = Connections();
  const connection = name
    ? connections[name]
    : connections[connections.default];
  return process.env.NODE_ENV === 'test' ? connections.test : connection;
};

export default ResolveConnectionConfig();
