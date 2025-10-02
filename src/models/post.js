import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
    },
    // Trường clickCount đã được thêm vào
    clickCount: {
      type: Number,
      default: 0, // Mặc định là 0
    },
  },
  {
    timestamps: true,
  }
);

// Dòng này đã được sửa lỗi đánh máy: mongoose.mmodel -> mongoose.model
const Post = mongoose.model("Post", PostSchema); 

export default Post;