/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("blurb").notNullable();
    table.string("author").notNullable();
    table.string("textFilePath").notNullable();
    table.string("CoverImagePath").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("locked").defaultTo("false");
    table.integer("lockedBy_id");
    table.timestamp("lockedUntil");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("books");
};
