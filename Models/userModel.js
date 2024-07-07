import initKnex from "knex";
import bcrypt from "bcrypt";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const knex = initKnex(configuration);

async function getUser(id) {
  const user = await knex("users").where({ id: id }).first();
  delete user.password;
  return user;
}

async function getBorrowedBooks(id) {
  try {
    const books = await knex("books")
      .select("id", "title", "author", "CoverImagePath")
      .where("lockedBy_id", id);

    return books;
  } catch (error) {
    console.error(error);
    return {error: "500"}
  }
}

async function postSignUp(username, password) {
  try {
    //Checks if there is an existing user with that username
    const existingUser = await knex("users")
      .where({ username: username })
      .first();
    if (existingUser) {
      return { error: "Existing User" };
    }
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
    return { error: "500" };
  }
}

async function postLogin(username, password) {
  try {
    const user = await knex("users").where({ username: username }).first();
    if (!user) {
      return { error: "no user" };
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return { error: "incorrect password" };
    }

    const jwtData = { userId: user.id };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    console.error(error);
    return { error: "500" };
  }
}

export default {
  getUser,
  getBorrowedBooks,
  postSignUp,
  postLogin,
};
