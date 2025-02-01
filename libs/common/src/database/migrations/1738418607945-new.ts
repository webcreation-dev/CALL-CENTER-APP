import { MigrationInterface, QueryRunner } from "typeorm";

export class New1738418607945 implements MigrationInterface {
    name = 'New1738418607945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."status_conversation_enum" AS ENUM('OPEN', 'CLOSED')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."canal_type_enum" AS ENUM('WHATSAPP', 'TELEGRAM', 'SMS', 'MESSENGER')
        `);
        await queryRunner.query(`
            CREATE TABLE "conversation" (
                "id" SERIAL NOT NULL,
                "phone_number" character varying NOT NULL,
                "status" "public"."status_conversation_enum" NOT NULL DEFAULT 'OPEN',
                "canal" "public"."canal_type_enum" NOT NULL,
                "reason" character varying,
                "first_response_at" TIMESTAMP,
                "closed_at" TIMESTAMP,
                "user_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."sender_type_enum" AS ENUM('CLIENT', 'COMPANY')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."status_message_enum" AS ENUM(
                'QUEUED',
                'SENT',
                'DELIVERED',
                'READ',
                'FAILED',
                'CANCELED'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "message" (
                "id" SERIAL NOT NULL,
                "sender_type" "public"."sender_type_enum" NOT NULL,
                "status" "public"."status_message_enum" NOT NULL DEFAULT 'QUEUED',
                "message" character varying NOT NULL,
                "sid" character varying,
                "conversationId" integer,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"
        `);
        await queryRunner.query(`
            DROP TABLE "message"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."status_message_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."sender_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "conversation"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."canal_type_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."status_conversation_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
