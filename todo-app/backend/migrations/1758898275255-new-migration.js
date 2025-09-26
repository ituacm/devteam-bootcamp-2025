/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class NewMigration1758898275255 {
    name = 'NewMigration1758898275255'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."elevated_tokens_action_enum" AS ENUM('change_email', 'change_password')`);
        await queryRunner.query(`CREATE TABLE "elevated_tokens" ("token" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "action" "public"."elevated_tokens_action_enum" NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "used" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7a4f036db2e9778b3e275ea64cc" PRIMARY KEY ("token"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "elevated_tokens"`);
        await queryRunner.query(`DROP TYPE "public"."elevated_tokens_action_enum"`);
    }
}
