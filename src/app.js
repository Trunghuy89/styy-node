import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import rootRouter from "./routes/index.js"; // ✅ import router gốc

const app = express();
const PORT = 3000;

// --- KẾT NỐI MONGODB ---
const MONGODB_URI = "mongodb://localhost:27017/nodejs";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// --- ROUTES ---
app.use("/api", rootRouter);

// --- TRANG GỐC ---
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Server đang hoạt động!",
    api: {
      authors: `http://localhost:${PORT}/api/authors`,
      users: `http://localhost:${PORT}/api/auth`,
    },
  });
});

// --- KHỞI CHẠY SERVER ---
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
});
