import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1687865340745 implements MigrationInterface {
    name = ' $npmConfigName1687865340745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "race_event" DROP CONSTRAINT "FK_03e9b86f77e2b986859960de869"`);
        await queryRunner.query(`ALTER TABLE "race_event" ADD CONSTRAINT "FK_03e9b86f77e2b986859960de869" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "race_event" DROP CONSTRAINT "FK_03e9b86f77e2b986859960de869"`);
        await queryRunner.query(`ALTER TABLE "race_event" ADD CONSTRAINT "FK_03e9b86f77e2b986859960de869" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
