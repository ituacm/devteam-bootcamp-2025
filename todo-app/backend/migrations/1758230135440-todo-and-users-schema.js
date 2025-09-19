/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class TodoAndUsersSchema1758230135440 {
  name = "TodoAndUsersSchema1758230135440";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "completed" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "user_id" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "title" character varying(255) NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "description" text NOT NULL`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_TODO_COMPLETED" ON "todos" ("completed") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_TODO_CREATED_AT" ON "todos" ("created_at") `
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
    await queryRunner.query(`DROP INDEX "public"."IDX_TODO_CREATED_AT"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_TODO_COMPLETED"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "description" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "title" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "completed"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
