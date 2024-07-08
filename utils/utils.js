import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function unlocker() {
  try {
    const lockedInfo = await knex("books")
      .update({ locked: false, lockedUntil: null, lockedBy_id: null })
      .where(knex.raw("lockedUntil < NOW()"));
  } catch (error) {
    console.error(error);
  }
}
