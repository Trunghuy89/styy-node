import express from "express";
import morgan from "morgan";
import postRouter from "./routers/post.js";
import productRouter from "./routers/product.js";
import peopleRouter from "./routers/people.js"; // ✅ Thêm mới

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello, chào các bạn",
    apiLinks: {
      posts: `http://localhost:${PORT}/api/posts`,
      products: `http://localhost:${PORT}/api/products`,
      people: `http://localhost:${PORT}/api/people` // ✅ Link API mới
    }
  });
});

app.use("/api/posts", postRouter);
app.use("/api/products", productRouter);
app.use("/api/people", peopleRouter); // ✅ Thêm mới

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
