import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676899936222 implements MigrationInterface {
    name = 'default1676899936222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'unpaid'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'unsold'`);
    }

}
