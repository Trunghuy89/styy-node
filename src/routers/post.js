import express from "express";
// Đảm bảo import đúng tất cả các hàm từ controller
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.js"; // Đường dẫn của bạn có vẻ đúng

const router = express.Router();

// Route cho /api/posts (GET ALL & POST NEW)
router.route("/")
    .get(getAllPosts)   // GET: Lấy tất cả bài viết
    .post(createPost);  // POST: Thêm bài viết mới

// Route cho /api/posts/:id (GET ONE, PUT, DELETE)
router.route("/:id")
    .get(getPost)       // GET: Lấy chi tiết bài viết (có TĂNG LƯỢT CLICK)
    .put(updatePost)    // PUT: Cập nhật bài viết
    .delete(deletePost); // DELETE: Xóa bài viết

export default router;