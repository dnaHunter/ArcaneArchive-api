import express from "express";
import bookController from "../Controllers/bookController.js";

const router = express.Router();

router.get("/", bookController.getBookList);
router.get("/:id", bookController.getBookDetails);
router.get("/:id/reader");
router.post("/");
router.patch("/:id/lock");
router.patch("/:id/borrow");

export default router;
