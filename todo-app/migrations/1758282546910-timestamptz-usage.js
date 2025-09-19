/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class TimestamptzUsage1758282546910 {
  name = "TimestamptzUsage1758282546910";

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_TODO_CREATED_AT"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_TODO_CREATED_AT" ON "todos" ("created_at") `
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP INDEX "public"."IDX_TODO_CREATED_AT"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_TODO_CREATED_AT" ON "todos" ("created_at") `
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }
}
