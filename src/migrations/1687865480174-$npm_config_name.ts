import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1687865480174 implements MigrationInterface {
    name = ' $npmConfigName1687865480174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_d4e3f93ef928103f36446e17379"`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_d4e3f93ef928103f36446e17379" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_d4e3f93ef928103f36446e17379"`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_d4e3f93ef928103f36446e17379" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
