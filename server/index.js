import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import geminiResponse from "./gemini.js";
const port = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "https://assistantui.onrender.com", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
// app.get("/", async (req, res) => {
//   let prompt = req.query.prompt;
//   let data = await geminiResponse(prompt);
//   res.json(data);
// });
app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  connectDB();
  console.log("app is running at port:", port);
});
