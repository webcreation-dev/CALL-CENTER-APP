"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.New1738410728792 = void 0;
class New1738410728792 {
    constructor() {
        this.name = 'New1738410728792';
    }
    async up(queryRunner) {
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
                "url" character varying NOT NULL,
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
            ALTER TABLE "message"
            ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"
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
            DROP TABLE "message"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."status_message_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."sender_type_enum"
        `);
    }
}
exports.New1738410728792 = New1738410728792;
//# sourceMappingURL=1738410728792-new.js.map