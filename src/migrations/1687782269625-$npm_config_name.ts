import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1687782269625 implements MigrationInterface {
    name = '$npmConfigName1687782269625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "hp" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "hp"`);
    }

}
