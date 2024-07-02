import express from "express";
import reviewController from "../Controllers/reviewController.js";

const router = express.Router();

router.get("/:bookId", reviewController.getBooksReviews);
router.post("/", reviewController.postReview);

export default router;
