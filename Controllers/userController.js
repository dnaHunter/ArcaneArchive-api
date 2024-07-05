import express from "express";
import userModel from "../Models/userModel.js";

function getUser(req, res) {}

function getBorrowedBooks(req, res) {}

function getLogged(req, res) {}

async function postSignUp(req, res) {
  const { username, password } = req.body;

  if (!password || !username) {
    return res
      .status(400)
      .send("Please enter all required fields: name, address");
  }

  const response = await userModel.postSignUp(username, password);

  if (response.error) {
    if (response.error === "500") {
      return res.status(500).json({ message: "Internal Server Error." });
    } else if (response.error === "Existing User") {
      return res
        .status(400)
        .json({ message: "Existing user with that username" });
    }
  }

  res.status(201).json(response);
}

async function postLogin(req, res) {
  const { username, password } = req.body;

  if (!password || !username) {
    return res
      .status(400)
      .send("Please enter all required fields: name, address");
  }

  const response = await userModel.postLogin(username, password);
  //Checks error responses
  if (response.error) {
    if (response.error === "no user") {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    } else if (response.error === "incorrect password") {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    } else if (response.error === "500") {
      return res.status(500).json({ message: "Internal Server error" });
    }
  }

  res.json({ token: response });
}

export default {
  getUser,
  getBorrowedBooks,
  getLogged,
  postSignUp,
  postLogin,
};
