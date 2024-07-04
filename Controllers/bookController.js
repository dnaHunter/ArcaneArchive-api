import bookModel from "../Models/bookModel.js";
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

  if (!book) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (book.locked) {
    return res.json({ locked: true });
  }

  bookModel.lockBook(id, 1, "minute");
  res.sendFile(appRootPath + book.textFilePath);
}

async function postBook(req, res) {
  const body = req.body;
  const files = req.files;

  if (
    !body.title ||
    !body.blurb ||
    !body.author ||
    !files.coverFile ||
    !files.textFile
  ) {
    return res.status(400).json({
      message: "A book needs a title, blurb, author, coverFile and textFile.",
    });
  }

  //ADD VALIDATION FOR 2 FILES OF THE SAME NAME

  const response = await bookModel.postBook(body, files);

  if (!response) {
    return res.status(404).json({ message: "Bad request" });
  }

  res.status(201).json(response);
}

function lockBook(req, res) {}

function borrowBook(req, res) {}

async function lockHeartbeat(req, res) {
  const id = req.params.id;

  const locked = await bookModel.lockHeartbeat(id);

  if (!locked) {
    return res.status(404).json({ message: "Invalid book id" });
  }

  res.status(204).send();
}

export default {
  getBookList,
  getBookDetails,
  getBookReader,
  postBook,
  lockBook,
  borrowBook,
  lockHeartbeat,
};
