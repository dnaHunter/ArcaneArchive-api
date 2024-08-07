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
  const userId = req.userId;

  const book = await bookModel.getBookReader(id);

  if (!book) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (book.locked && book.lockedBy_id !==userId) {
    
    return res.json({ locked: true });
  }

  bookModel.lockBook(id, 15, "second");
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

async function borrowBook(req, res) {
  const userId = req.userId;
  const id = req.params.id;

  const response = await bookModel.borrowBook(userId, id);

  if (response.error) {
    if (response.error === "no book") {
      return res.status(404).json({ message: "There is no book with that id" });
    }
    if (response.error === "locked") {
      return res
        .status(403)
        .json({ message: "Locked", until: response.until});
    }
    if (response.error === "500") {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  res.json(response);
}

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
  borrowBook,
  lockHeartbeat,
};
