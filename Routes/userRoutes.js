import express from "express";
import userController from "../Controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id");
router.get("/:id/borrowed-books");
router.get("/me", auth, userController.getUser);
router.post("/", userController.postSignUp);
router.post("/login", userController.postLogin);

export default router;
