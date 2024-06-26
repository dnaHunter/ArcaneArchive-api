import express from "express";
import bookModel from "../Models/bookModel.js";

// GET /books/
async function getBookList(req, res) {
  const data = await bookModel.getBookList();

  if (!data) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  res.json(data)
}

function getBookDetails(req, res) {}

function getBookReader(req, res) {}

function postBook(req, res) {}

function lockBook(req, res) {}

function borrowBook(req, res) {}

export default {
  getBookList,
  getBookDetails,
  getBookReader,
  postBook,
  lockBook,
  borrowBook,
};
