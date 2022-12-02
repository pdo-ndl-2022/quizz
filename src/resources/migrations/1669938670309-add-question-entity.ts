import {MigrationInterface, QueryRunner} from "typeorm";

export class addQuestionEntity1669938670309 implements MigrationInterface {
    name = 'addQuestionEntity1669938670309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying NOT NULL, "options" character varying NOT NULL, "answers" character varying NOT NULL, "docs" character varying NOT NULL, "avg_score" integer NOT NULL, "nb_answers" integer NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
