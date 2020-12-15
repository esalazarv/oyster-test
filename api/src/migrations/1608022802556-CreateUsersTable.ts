import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateUsersTable1608022802556 implements MigrationInterface {
  name = 'CreateUsersTable1608022802556';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime)`,
    );

    // TODO: move to a seeder
    const name = 'Admin';
    const email = 'admin@oyster.com';
    const password = await bcrypt.hash('secret', 10);
    await queryRunner.query(
      `INSERT INTO "users" (name, email, password) VALUES("${name}", "${email}", "${password}")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
