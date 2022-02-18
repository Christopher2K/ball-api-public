import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Profiles extends BaseSchema {
  protected tableName = "profiles";

  public async up() {
    this.schema
      .createTable(this.tableName, (table) => {
        table.uuid("id").primary();

        table.string("username", 20).unique({
          indexName: "users_username_index",
        });
        table.string("first_name").nullable().defaultTo(null);
        table.string("last_name").nullable().defaultTo(null);
        table.date("date_of_birth").nullable().defaultTo(null);
        table.string("avatar_url").nullable().defaultTo(null);

        table.uuid("user_id").notNullable();

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp("created_at", { useTz: false });
        table.timestamp("updated_at", { useTz: false });
      })
      .raw(
        `ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES auth.users("id") ON DELETE CASCADE;`
      );
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
