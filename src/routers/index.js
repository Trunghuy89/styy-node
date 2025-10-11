import { Router } from "express";
import authorRouter from "./author.js";
import userRouter from "./user.js";

const rootRouter = Router();

// Gắn các route con
rootRouter.use("/authors", authorRouter);
rootRouter.use("/auth", userRouter);

// Route kiểm tra hoạt động
rootRouter.get("/", (req, res) => {
  res.json({ message: "🌐 Root route hoạt động!" });
});

export default rootRouter; // ⚠️ Cực kỳ quan trọng
