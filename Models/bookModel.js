import initKnex from "knex";
import configuration from "../knexfile.js";
import dayjs from "dayjs";
import fs from "fs";
import appRootPath from "app-root-path";
const knex = initKnex(configuration);

async function getBookList() {
  try {
    const list = await knex("books").select(
      "id",
      "title",
      "author",
      "coverImagePath"
    );
    return list;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getBookDetails(id) {
  try {
    const details = await knex("books")
      .select(
        "id",
        "title",
        "author",
        "coverImagePath",
        "blurb",
        "locked",
        "lockedUntil"
      )
      .where("id", id)
      .first();
    return details;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getBookReader(id) {
  try {
    const book = await knex("books")
      .select("id", "locked", "textFilePath")
      .where("id", id)
      .first();

    return book;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//POST NEW BOOK
async function postBook(body, files) {
  const coverFile = files.coverFile[0];
  const textFile = files.textFile[0];

  //Write text file to server storage
  const folderName = body.title.replaceAll(" ", "-");
  const textDirectory = `${appRootPath}/assets/Books/${folderName}/`;
  const textFilePath = `/assets/Books/${folderName}/${textFile.originalname}`;

  if (!fs.existsSync(textDirectory)) {
    fs.mkdirSync(textDirectory);
  }

  fs.writeFile(
    `${textDirectory}/${textFile.originalname}`,
    textFile.buffer,
    (err) => err && console.error(err)
  );

  //Write cover to server storage
  const CoverImagePath = `Covers/${coverFile.originalname}`;

  fs.writeFile(
    `${appRootPath}/public/${CoverImagePath}`,
    coverFile.buffer,
    (err) => err && console.error(err)
  );

  const book = {
    title: body.title,
    blurb: body.blurb,
    author: body.author,
    textFilePath,
    CoverImagePath,
  };

  try {
    const [id] = await knex("books").insert(book);

    const response = await knex("books").where("id", id);
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function lockBook(id, timeNum, scale) {
  const now = dayjs();
  const lockedUntil = now.add(timeNum, scale).format();

  try {
    const locked = await knex("books")
      .update({ locked: true, lockedUntil })
      .where("id", id);
    return true;
  } catch (error) {
    console.error(error);
  }
}

async function borrowBook(userId, id) {
  const now = dayjs();
  const lockedUntil = now.add(7, "day").format();
  try {
    const response = await knex("books")
      .update({ locked: 1, lockedBy_id: userId, lockedUntil })
      .where({ id: id });

    if (!response) {
      return { error: "no book" };
    }

    const borrowedBook = await knex("books").where("id", response).first();
    return borrowedBook;
  } catch (error) {
    console.error(error);
    return { error: "500" };
  }
}

async function lockHeartbeat(id) {
  const now = dayjs();
  const lockedUntil = now.add(10, "second").format();

  try {
    const data = await knex("books")
      .update({ locked: true, lockedUntil })
      .where("id", id);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
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
