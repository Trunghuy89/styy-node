import express from "express";
import morgan from "morgan";

// Routers
import postRouter from "./routers/post.js";
import productRouter from "./routers/product.js";
import peopleRouter from "./routers/people.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Trang gốc: liệt kê link API
app.get("/", (req, res) => {
  res.json({
    message: "Hello, chào các bạn",
    apiLinks: {
      posts:   `http://localhost:${PORT}/api/posts`,
      products:`http://localhost:${PORT}/api/products`,
      people:  `http://localhost:${PORT}/api/people`
    }
  });
});

// Sử dụng từng router
app.use("/api/posts", postRouter);     // có tìm kiếm ?search=keyword
app.use("/api/products", productRouter);
app.use("/api/people", peopleRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
