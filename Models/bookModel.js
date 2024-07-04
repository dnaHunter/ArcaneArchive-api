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

async function postBook(body, files) {
  const coverFile = files.coverFile[0];
  const textFile = files.textFile[0];

  const folderName = body.title.replaceAll(" ", "-");
  const directory = `${appRootPath}/assets/Books/${folderName}/`;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  fs.writeFile(
    `${directory}/${textFile.originalname}`,
    textFile.buffer,
    (err) => err && console.error(err)
  );
}

async function lockBook(id, timeNum, scale) {
  //console.log("Lock", new Date().toLocaleTimeString());
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

function borrowBook() {}

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
