import { MigrationInterface, QueryRunner } from "typeorm"

export class AddForMigrationExampleRemove1699191167858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE test`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE test (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }

}
