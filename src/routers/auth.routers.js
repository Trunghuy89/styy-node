import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const router = express.Router();

// 🟢 Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ Email đã tồn tại!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ Đăng ký thành công!", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "❌ Lỗi đăng ký", error: error.message });
  }
});

// 🟡 Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "❌ Email không tồn tại!" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Sai mật khẩu!" });
    }

    // Tạo token
    const token = jwt.sign({ id: user._id }, "mysecretkey", { expiresIn: "2h" });

    res.status(200).json({
      message: "✅ Đăng nhập thành công!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Lỗi đăng nhập", error: error.message });
  }
});

// 🔵 Lấy danh sách user
router.get("/profile", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;











