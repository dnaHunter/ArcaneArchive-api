import express from "express";
import reviewController from "../Controllers/reviewController.js";
import { reviewAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/:bookId", reviewController.getBooksReviews);
router.post("/", reviewAuth, reviewController.postReview);

export default router;
