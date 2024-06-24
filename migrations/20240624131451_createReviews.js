/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("reveiws", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("body").notNullable();
    table.integer("user_id").notNullable();
    table.integer("book_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("reviews");
};
