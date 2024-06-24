/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("body").notNullable();
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("users.id")
      .onDelete("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("book_id")
      .notNullable()
      .unsigned()
      .references("books.id")
      .onDelete("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("reviews");
}
