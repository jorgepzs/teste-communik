import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676697802804 implements MigrationInterface {
    name = 'default1676697802804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_4c9fb58de893725258746385e16"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name")`);
    }

}
