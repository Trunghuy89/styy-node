import Post from "../models/Post.js"; // Đã sửa đường dẫn/case để tránh lỗi

// Các hàm controller không cần import Request, Response vì chúng có sẵn trong Node/Express.

// 1. GET ALL POSTS (Lấy danh sách, có thể dùng để tìm kiếm)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Lỗi Server khi lấy tất cả bài viết", error: err.message });
  }
};

// 2. GET ONE POST VÀ TĂNG LƯỢT CLICK
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    // LOGIC TĂNG LƯỢT CLICK
    post.clickCount += 1;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Lỗi Server khi lấy chi tiết bài viết", error: err.message });
  }
};

// 3. CREATE NEW POST (THÊM MỚI)
export const createPost = async (req, res) => {
  try {
    // req.body chứa { title: "...", content: "..." }
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // 201 Created
  } catch (err) {
    // 400 Bad Request nếu thiếu trường required
    res.status(400).json({ message: "Tạo bài viết thất bại", error: err.message });
  }
};

// 4. UPDATE POST (SỬA)
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Cập nhật các trường gửi lên
      { new: true, runValidators: true } // Trả về document mới, kiểm tra rules
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Không tìm thấy bài viết để cập nhật" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: "Cập nhật bài viết thất bại", error: err.message });
  }
};

// 5. DELETE POST (XÓA)
export const deletePost = async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy bài viết để xóa" });
    }
    res.status(200).json({ message: "Xóa bài viết thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi Server khi xóa bài viết", error: err.message });
  }
};