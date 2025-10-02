import express from "express";
import morgan from "morgan";
import mongoose from "mongoose"; // ĐÃ THÊM
  
// Routers
import postRouter from "./routers/post.js";
import productRouter from "./routers/product.js";
import peopleRouter from "./routers/people.js";

const app = express();
const PORT = 3000;

// --- KẾT NỐI MONGODB ---
const MONGODB_URI = "mongodb://localhost:27017/nodejs"; 

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => console.error("❌ Could not connect to MongoDB:", err));

// --- MIDDLEWARE ---
app.use(morgan("dev"));
app.use(express.json());

// --- TRANG GỐC / ---
// Trang gốc: liệt kê link API
app.get("/", (req, res) => {
  res.json({
    message: "Hello, chào các bạn",
    apiLinks: {
      posts: `http://localhost:${PORT}/api/posts`,
      products: `http://localhost:${PORT}/api/products`,
      people: `http://localhost:${PORT}/api/people`,
    },
  });
});

// --- SỬ DỤNG CÁC ROUTER ---
app.use("/api/posts", postRouter); // có tìm kiếm ?search=keyword
app.use("/api/products", productRouter);
app.use("/api/people", peopleRouter);

// --- KHỞI CHẠY SERVER ---
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
