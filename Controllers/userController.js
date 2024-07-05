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

  if (!response) {
    return res.status(500).json({ message: "Internal Server Error."});
  }

  res.status(201).json(response);
}

function postLogin(req, res) {}

export default {
  getUser,
  getBorrowedBooks,
  getLogged,
  postSignUp,
  postLogin,
};
