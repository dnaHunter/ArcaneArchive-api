import initKnex from "knex";
import bcrypt from "bcrypt";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";

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

async function postLogin(username, password) {
  try {
    const user = await knex("users").where({ username: username }).first();
    if (!user) {
      console.log(user, "users");
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
    return { error: "500" };
  }
}

export default {
  getUser,
  getBorrowedBooks,
  getLogged,
  postSignUp,
  postLogin,
};
