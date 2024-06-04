import express from "express";
import mongoose from "mongoose";
import rootRouter from "./api/routers/index.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
await mongoose.connect(process.env.DATABASE_URL);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
