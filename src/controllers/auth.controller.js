import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

// Đăng ký
export const signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      message: "✅ Đăng ký thành công!",
      data: userData,
    });
  } catch (err) {
    res.status(400).json({
      message: "❌ Lỗi đăng ký",
      error: err.message,
    });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu sai!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "mysecretkey",
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "✅ Đăng nhập thành công!",
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
      message: "❌ Lỗi đăng nhập",
      error: err.message,
    });
  }
};
