import express from "express";
import cors from "cors";
import bookRoutes from "./Routes/bookRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";
import "dotenv/config";

const PORT = process.env.PORT;
const BACKEND_URL = process.env.BACKEND_URL;

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${BACKEND_URL}:${PORT}`);
});
