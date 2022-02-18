import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();

      table.string("username", 20).unique({
        indexName: "users_username_index",
      });
      table.string("email", 255).unique({
        indexName: "users_email_index",
      });
      table.string("password", 80).notNullable();

      table.string("first_name").nullable().defaultTo(null);
      table.string("last_name").nullable().defaultTo(null);
      table.date("date_of_birth").nullable().defaultTo(null);
      table.string("avatar_url").nullable().defaultTo(null);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: false });
      table.timestamp("updated_at", { useTz: false });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
