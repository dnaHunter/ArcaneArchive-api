import express from "express";
import reviewModel from "../Models/reviewModel.js";

async function getBooksReviews(req, res) {
  const data = await reviewModel.getBooksReviews(req.params.bookId);

  if (!data) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  res.json(data);
}

function postReview(req, res) {}

export default { getBooksReviews, postReview };
