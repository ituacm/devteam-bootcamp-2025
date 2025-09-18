/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class TodoUsersIdTypes1758230669709 {
  name = "TodoUsersIdTypes1758230669709";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "todos" DROP CONSTRAINT "FK_53511787e1f412d746c4bf223ff"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "todos" DROP CONSTRAINT "PK_ca8cafd59ca6faaf67995344225"`
    );
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id")`
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_TODO_USER_ID"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "user_id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_TODO_USER_ID" ON "todos" ("user_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD CONSTRAINT "FK_53511787e1f412d746c4bf223ff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "todos" DROP CONSTRAINT "FK_53511787e1f412d746c4bf223ff"`
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_TODO_USER_ID"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "user_id" integer NOT NULL`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_TODO_USER_ID" ON "todos" ("user_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "todos" DROP CONSTRAINT "PK_ca8cafd59ca6faaf67995344225"`
    );
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "todos" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD CONSTRAINT "FK_53511787e1f412d746c4bf223ff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
