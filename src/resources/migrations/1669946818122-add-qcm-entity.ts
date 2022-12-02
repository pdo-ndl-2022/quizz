import {MigrationInterface, QueryRunner} from "typeorm";

export class addQcmEntity1669946818122 implements MigrationInterface {
    name = 'addQcmEntity1669946818122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "qcm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_d2ff0ae00a3b6a3700e2942cf12" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "qcm"`);
    }

}
