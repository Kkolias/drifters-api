import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1687862380727 implements MigrationInterface {
    name = '$npmConfigName1687862380727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "race_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "startsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "trackId" uuid, CONSTRAINT "PK_9f9bab65e842ccd321c4397bbbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "race_event" ADD CONSTRAINT "FK_03e9b86f77e2b986859960de869" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "race_event" DROP CONSTRAINT "FK_03e9b86f77e2b986859960de869"`);
        await queryRunner.query(`DROP TABLE "race_event"`);
    }

}
