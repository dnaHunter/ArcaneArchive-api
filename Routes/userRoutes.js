import express from "express";

const router = express.Router();

router.get("/:id");
router.get("/:id/borrowed-books");
router.get("/loggedIn");
router.post("/"); //set up
router.post("/login");

export default router;
