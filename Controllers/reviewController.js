import express from "express";
import reviewModel from "../Models/reviewModel.js";

async function getBooksReviews(req, res) {
  const data = await reviewModel.getBooksReviews(req.params.bookId);

  if (!data) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  res.json(data);
}

async function postReview(req, res) {
  const body = req.body;
  const userId = req.userId;

  if (!body.title || !body.body || !body.book_id) {
    return res
      .status(400)
      .json({ message: "A review needs a title, body and bookId" });
  }

  const newPost = await reviewModel.postReview(body, userId);

  if (!newPost) {
    return res
      .status(400)
      .json("Request encountered an error. Check the request.");
  }

  res.json(newPost);
}

export default { getBooksReviews, postReview };
