import express from "express";
import userController from "../Controllers/userController.js";

const router = express.Router();

router.get("/:id");
router.get("/:id/borrowed-books");
router.get("/loggedIn");
router.post("/", userController.postSignUp);
router.post("/login", userController.postLogin);

export default router;
