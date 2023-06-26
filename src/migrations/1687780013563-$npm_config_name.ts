import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1687780013563 implements MigrationInterface {
    name = '$npmConfigName1687780013563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "torque"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "torque" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "torque"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "torque" character varying`);
    }

}
