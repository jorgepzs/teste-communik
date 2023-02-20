import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676671640205 implements MigrationInterface {
    name = 'default1676671640205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" text NOT NULL, "price" integer NOT NULL, "status" text NOT NULL DEFAULT 'unsold', "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "ordersId" integer, CONSTRAINT "UQ_a95860aa92d1420e005893043de" UNIQUE ("username"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "total_value" integer NOT NULL, "status" text NOT NULL DEFAULT 'unsold', "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" integer, "products" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "managers" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_fccadd24fa0b0f7e1793ba007aa" UNIQUE ("username"), CONSTRAINT "PK_e70b8cc457276d9b4d82342a8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients_client_products_products" ("clientsId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_1ad035fefae52efb1afab642576" PRIMARY KEY ("clientsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0b0da72b70e2bed53942354462" ON "clients_client_products_products" ("clientsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f1676aa43a2f9fad86b9412718" ON "clients_client_products_products" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "managers_products_manager_products" ("managersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_f7ef80614c57e4ebd09339964d9" PRIMARY KEY ("managersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7b94eb269da93eca19e2ac12b" ON "managers_products_manager_products" ("managersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5eaa17f7c07a5c4f4e4d70b004" ON "managers_products_manager_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_ea9493ff75bfcfb2757a024e6a1" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_505ba3689ef2763acd6c4fc93a4" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_54b8301e01652f2ff5304e435c9" FOREIGN KEY ("products") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients_client_products_products" ADD CONSTRAINT "FK_0b0da72b70e2bed539423544623" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients_client_products_products" ADD CONSTRAINT "FK_f1676aa43a2f9fad86b9412718a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "managers_products_manager_products" ADD CONSTRAINT "FK_a7b94eb269da93eca19e2ac12b6" FOREIGN KEY ("managersId") REFERENCES "managers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "managers_products_manager_products" ADD CONSTRAINT "FK_5eaa17f7c07a5c4f4e4d70b0042" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "managers_products_manager_products" DROP CONSTRAINT "FK_5eaa17f7c07a5c4f4e4d70b0042"`);
        await queryRunner.query(`ALTER TABLE "managers_products_manager_products" DROP CONSTRAINT "FK_a7b94eb269da93eca19e2ac12b6"`);
        await queryRunner.query(`ALTER TABLE "clients_client_products_products" DROP CONSTRAINT "FK_f1676aa43a2f9fad86b9412718a"`);
        await queryRunner.query(`ALTER TABLE "clients_client_products_products" DROP CONSTRAINT "FK_0b0da72b70e2bed539423544623"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_54b8301e01652f2ff5304e435c9"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_505ba3689ef2763acd6c4fc93a4"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_ea9493ff75bfcfb2757a024e6a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5eaa17f7c07a5c4f4e4d70b004"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7b94eb269da93eca19e2ac12b"`);
        await queryRunner.query(`DROP TABLE "managers_products_manager_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1676aa43a2f9fad86b9412718"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0b0da72b70e2bed53942354462"`);
        await queryRunner.query(`DROP TABLE "clients_client_products_products"`);
        await queryRunner.query(`DROP TABLE "managers"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
