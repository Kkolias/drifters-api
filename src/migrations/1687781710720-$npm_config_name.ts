import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1687781710720 implements MigrationInterface {
    name = '$npmConfigName1687781710720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_d4e3f93ef928103f36446e17379"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "driverId"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "driverId" uuid`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_d4e3f93ef928103f36446e17379" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_d4e3f93ef928103f36446e17379"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "driverId"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "driverId" integer`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_d4e3f93ef928103f36446e17379" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
