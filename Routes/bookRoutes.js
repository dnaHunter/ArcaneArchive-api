import express from "express";
import bookController from "../Controllers/bookController.js";
import multer from "multer";
import { auth } from "../middleware/auth.js";

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
router.patch("/:id/borrow", auth, bookController.borrowBook);

export default router;
