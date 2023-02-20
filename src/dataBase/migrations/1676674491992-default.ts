import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676674491992 implements MigrationInterface {
    name = 'default1676674491992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_ea9493ff75bfcfb2757a024e6a1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_54b8301e01652f2ff5304e435c9"`);
        await queryRunner.query(`CREATE TABLE "order_products" ("ordersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_d54c72aad4aa434d7005bb3ea86" PRIMARY KEY ("ordersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e020902538d18eeabb8b3c59f" ON "order_products" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fe4b96332d76d9339112fa257d" ON "order_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "ordersId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "products"`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_8e020902538d18eeabb8b3c59f7" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_fe4b96332d76d9339112fa257d7" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_fe4b96332d76d9339112fa257d7"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_8e020902538d18eeabb8b3c59f7"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "products" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "ordersId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe4b96332d76d9339112fa257d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e020902538d18eeabb8b3c59f"`);
        await queryRunner.query(`DROP TABLE "order_products"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_54b8301e01652f2ff5304e435c9" FOREIGN KEY ("products") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_ea9493ff75bfcfb2757a024e6a1" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
