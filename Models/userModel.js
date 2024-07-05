import initKnex from "knex";
import bcrypt from "bcrypt";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

function getUser() {}

function getBorrowedBooks() {}

function getLogged() {}

async function postSignUp(username, password) {
  try {
    const salt = bcrypt.genSaltSync(2);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
    };

    const [createdId] = await knex("users").insert(newUser);
    return createdId;
    
  } catch (error) {
    console.error(error);
    return false;
  }
}

function postLogin() {}

export default {
  getUser,
  getBorrowedBooks,
  getLogged,
  postSignUp,
  postLogin,
};
