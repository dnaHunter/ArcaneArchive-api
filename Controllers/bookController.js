import express from "express";
import bookModel from "../Models/bookModel.js";
import path from "path";
import appRootPath from "app-root-path";

// GET /books/
async function getBookList(req, res) {
  const data = await bookModel.getBookList();

  if (!data) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  res.json(data);
}

async function getBookDetails(req, res) {
  const data = await bookModel.getBookDetails(req.params.id);

  if (!data) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  res.json(data);
}

async function getBookReader(req, res) {
  const id = req.params.id;

  const book = await bookModel.getBookReader(id);

  if (book.error) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (book.locked) {
    return res.json({ locked: true });
  }
  
  res.sendFile(appRootPath + book.textFilePath);
}

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
