import express from "express";
import reviewModel from "../Models/reviewModel.js";

async function getBooksReviews(req, res) {
  const data = await reviewModel.getBooksReviews(req.params.id);

  if (!data) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function postReview(req, res) {}

export default { getBooksReviews, postReview };
