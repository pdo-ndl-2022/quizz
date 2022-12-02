import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserEntity1669950078703 implements MigrationInterface {
    name = 'addUserEntity1669950078703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("email" character varying NOT NULL, "given_name" character varying NOT NULL, "picture" character varying NOT NULL, "score" integer NOT NULL, CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
