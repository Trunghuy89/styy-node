// import { Router } from "express";
// const postRouter = Router();

// let posts = [
//   { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
//   { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
// ];

// // GET /api/posts - Lấy danh sách bài viết
// postRouter.get("/", (req, res) => {
//   res.json(posts);
// });

// // GET /api/posts/:id - Lấy chi tiết bài viết
// postRouter.get("/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const post = posts.find((p) => p.id === id);
//   if (!post) return res.status(404).json({ error: "Post not found" });
//   res.json(post);
// });

// // POST /api/posts - Thêm bài viết mới
// postRouter.post("/", (req, res) => {
//   const { title, content } = req.body;
//   if (!title || !content) {
//     return res.status(400).json({ error: "title and content are required" });
//   }
//   const newPost = { id: Date.now(), title, content };
//   posts.push(newPost);
//   res.status(201).json(newPost);
// });

// // DELETE /api/posts/:id - Xóa bài viết
// postRouter.delete("/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const index = posts.findIndex((p) => p.id === id);
//   if (index === -1) return res.status(404).json({ error: "Post not found" });

//   posts.splice(index, 1);
//   res.json({ success: true });
// });

// // PUT /api/posts/:id - Cập nhật bài viết
// postRouter.put("/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const post = posts.find((p) => p.id === id);
//   if (!post) return res.status(404).json({ error: "Post not found" });

//   const { title, content } = req.body;
//   post.title = title ?? post.title;
//   post.content = content ?? post.content;

//   res.json(post);
// });

// export default postRouter;


// src/routers/post.js
import express from "express";
import {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);           // ?search=keyword
router.get("/:id", getPostById);
router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
