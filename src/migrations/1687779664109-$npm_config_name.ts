import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1687779664109 implements MigrationInterface {
    name = '$npmConfigName1687779664109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_682034da8e53ef1bd0c679d63e0"`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "make"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "personId"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "engine" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "yearActiveStart" integer`);
        await queryRunner.query(`ALTER TABLE "car" ADD "yearActiveEnd" integer`);
        await queryRunner.query(`ALTER TABLE "car" ADD "torque" character varying`);
        await queryRunner.query(`ALTER TABLE "car" ADD "driverId" integer`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_d4e3f93ef928103f36446e17379" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_d4e3f93ef928103f36446e17379"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "driverId"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "torque"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "yearActiveEnd"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "yearActiveStart"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "engine"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "personId" integer`);
        await queryRunner.query(`ALTER TABLE "car" ADD "color" character varying`);
        await queryRunner.query(`ALTER TABLE "car" ADD "year" integer`);
        await queryRunner.query(`ALTER TABLE "car" ADD "make" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_682034da8e53ef1bd0c679d63e0" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
