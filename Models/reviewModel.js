import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function getBooksReviews(id) {
  try {
    const reviews = await knex("reviews").where("book_id", id);

    console.log(reviews);
    return reviews;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function postReview() {}

export default { getBooksReviews, postReview };
