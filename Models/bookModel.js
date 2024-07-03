import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function getBookList() {
  try {
    const list = await knex("books").select(
      "id",
      "title",
      "author",
      "coverImagePath"
    );
    return list;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getBookDetails(id) {
  try {
    const details = await knex("books")
      .select(
        "id",
        "title",
        "author",
        "coverImagePath",
        "blurb",
        "locked",
        "lockedUntil"
      )
      .where("id", id)
      .first();
    return details;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getBookReader(id) {
  try {
    const book = await knex("books")
      .select("id", "locked", "textFilePath")
      .where("id", id).first();

    return book;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

function postBook() {}

function lockBook() {}

function borrowBook() {}

export default {
  getBookList,
  getBookDetails,
  getBookReader,
  postBook,
  lockBook,
  borrowBook,
};
