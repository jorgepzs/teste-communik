import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676674972135 implements MigrationInterface {
    name = 'default1676674972135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients_products" ("clientsId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_b5eac476c2cad0bc21319700f39" PRIMARY KEY ("clientsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc5a22968b2798911f41a1e0c3" ON "clients_products" ("clientsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3bd922357f8621e41bf3fb1c06" ON "clients_products" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "manager_products" ("managersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_c9c51f08a5849e7b2177479008e" PRIMARY KEY ("managersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c9bcd638951e4ba9024c28055b" ON "manager_products" ("managersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d675b0a59cc8892188ac18e6d2" ON "manager_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "clients_products" ADD CONSTRAINT "FK_fc5a22968b2798911f41a1e0c35" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients_products" ADD CONSTRAINT "FK_3bd922357f8621e41bf3fb1c067" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "manager_products" ADD CONSTRAINT "FK_c9bcd638951e4ba9024c28055b9" FOREIGN KEY ("managersId") REFERENCES "managers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "manager_products" ADD CONSTRAINT "FK_d675b0a59cc8892188ac18e6d27" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manager_products" DROP CONSTRAINT "FK_d675b0a59cc8892188ac18e6d27"`);
        await queryRunner.query(`ALTER TABLE "manager_products" DROP CONSTRAINT "FK_c9bcd638951e4ba9024c28055b9"`);
        await queryRunner.query(`ALTER TABLE "clients_products" DROP CONSTRAINT "FK_3bd922357f8621e41bf3fb1c067"`);
        await queryRunner.query(`ALTER TABLE "clients_products" DROP CONSTRAINT "FK_fc5a22968b2798911f41a1e0c35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d675b0a59cc8892188ac18e6d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9bcd638951e4ba9024c28055b"`);
        await queryRunner.query(`DROP TABLE "manager_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bd922357f8621e41bf3fb1c06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc5a22968b2798911f41a1e0c3"`);
        await queryRunner.query(`DROP TABLE "clients_products"`);
    }

}
