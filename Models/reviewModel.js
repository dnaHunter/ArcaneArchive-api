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

async function postReview(body) {
  try {
    const [id] = await knex("reviews").insert(body);

    const newPost = await knex("reviews").where("id", id).first();

    return newPost;
  } catch (error) {
    //TODO ADD MORE SPECIFIC ERROR MESSAGE.
    console.error(error);
    return false;
  }
}

export default { getBooksReviews, postReview };
