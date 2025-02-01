"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.New1738405020722 = void 0;
class New1738405020722 {
    constructor() {
        this.name = 'New1738405020722';
    }
    async up(queryRunner) {
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
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }
}
exports.New1738405020722 = New1738405020722;
//# sourceMappingURL=1738405020722-new.js.map