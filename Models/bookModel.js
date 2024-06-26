import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function getBookList() {
  try {
    console.log("start");
    const list = await knex()
      .select("id", "title", "author", "coverImagePath")
      .from("books");
      console.log("end");
    return list;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getBookDetails() {}

function getBookReader() {}

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
