import express from "express";
import userModel from "../Models/userModel.js";

async function getUser(req, res) {
  const user = await userModel.getUser(req.userId);

  if (!user) {
    return res.status(500).json({ message: "Internal server error" });
  }

  res.json(user);
}

async function getBorrowedBooks(req, res) {
  const id = req.userId;

  const response = await userModel.getBorrowedBooks(id);

  if (response.error === "500") {
    return res.json({ message: "Internal Server Error" });
  }
  res.json(response);
}

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
  postSignUp,
  postLogin,
};
