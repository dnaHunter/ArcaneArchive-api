import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function getBooksReviews(id) {
  try {
    const reviews = await knex("reviews")
      .select(
        "reviews.id",
        "reviews.created_at",
        "reviews.title",
        "reviews.body",
        "reviews.user_id",
        "users.username"
      )
      .leftJoin("users", "users.id", "reviews.user_id")
      .where("book_id", id);

    return reviews;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function postReview() {}

export default { getBooksReviews, postReview };
