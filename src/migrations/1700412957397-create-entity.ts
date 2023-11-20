import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntity1700412957397 implements MigrationInterface {
    name = 'CreateEntity1700412957397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_26a8ff17b49cc3b5dcbdd7d357a" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_26a8ff17b49cc3b5dcbdd7d357a"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "orderId"`);
    }

}
