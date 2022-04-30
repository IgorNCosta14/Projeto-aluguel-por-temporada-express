import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Users1650650831178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "users",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "name",
                type: "varchar",
              },
              {
                name: "password",
                type: "varchar",
              },
              {
                name: "email",
                type: "varchar",
              },
              {
                name: "cpf",
                type: "varchar",
              },
              {
                name: "userPermission",
                type: "uuid",
              },
              {
                name: "createdAt",
                type: "timestamp",
                default: "now()",
              },
            ],
            foreignKeys: [
              {
                name: "FKUserPermission",
                referencedTableName: "permissions",
                referencedColumnNames: ["id"],
                columnNames: ["userPermission"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
              },
            ],
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
