import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1687879670027 implements MigrationInterface {
    name = ' $npmConfigName1687879670027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "championship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "series" character varying NOT NULL, CONSTRAINT "PK_56bdaa561586755c210dadc67c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "race_event" ADD "championshipId" uuid`);
        await queryRunner.query(`ALTER TABLE "race_event" ADD CONSTRAINT "FK_84f95f2818b230678650ddf91bb" FOREIGN KEY ("championshipId") REFERENCES "championship"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "race_event" DROP CONSTRAINT "FK_84f95f2818b230678650ddf91bb"`);
        await queryRunner.query(`ALTER TABLE "race_event" DROP COLUMN "championshipId"`);
        await queryRunner.query(`DROP TABLE "championship"`);
    }

}
