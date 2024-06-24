import users from "./data/users.js";
import books from "./data/books.js";
import reviews from "./data/reviews.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("reviews").del();
  await knex("books").del();
  await knex("users").del();
  
  await knex("users").insert(users);
  await knex("books").insert(books);
  await knex("reviews").insert(reviews);
}
