import knex from "knex";

async function getBooksReviews() {
  try {
    const reviews = await knex("reviews");
  } catch (error) {
    
  }
}

function postReview() {}

export default { getBooksReviews, postReview };
