import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Đăng ký
export const signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // Xóa password trước khi trả về client
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      message: "Đăng ký thành công",
      data: userData,
    });
  } catch (err) {
    res.status(400).json({
      message: "Lỗi khi đăng ký người dùng",
      error: err.message,
    });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm user theo email (có select password)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại!" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng!" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "mysecretkey", // 👉 nên cho vào biến môi trường
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi khi đăng nhập",
      error: err.message,
    });
  }
};
