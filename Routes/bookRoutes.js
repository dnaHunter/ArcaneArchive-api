import express from "express";
import bookController from "../Controllers/bookController.js";
import multer from "multer";

const router = express.Router();

router.get("/", bookController.getBookList);
router.get("/:id", bookController.getBookDetails);
router.get("/:id/reader", bookController.getBookReader);
router.patch("/:id/beat", bookController.lockHeartbeat);
const fields = multer().fields([
  { name: "coverFile", maxCount: 1 },
  { name: "textFile", maxCount: 1 },
]);
router.post("/", fields, bookController.postBook);
router.patch("/:id/lock");
router.patch("/:id/borrow");

export default router;
