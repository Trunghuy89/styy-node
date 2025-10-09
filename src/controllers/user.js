import UserModel from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcrypt";

// ====================================
// A. JOI VALIDATION SCHEMA (Register)
// ====================================

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(50)
    .messages({
      "any.required": "Tên là bắt buộc.",
      "string.min": "Tên phải có ít nhất 3 ký tự.",
    }),
  
  email: Joi.string().required().email()
    .messages({
      "any.required": "Email là bắt buộc.",
      "string.email": "Email không hợp lệ.",
    }),
    
  password: Joi.string().required().min(6)
    .messages({
      "any.required": "Mật khẩu là bắt buộc.",
      "string.min": "Mật khẩu phải có ít nhất 6 ký tự.",
    }),
});

// ====================================
// B. MIDDLEWARE VALIDATION TIỆN ÍCH
// ====================================
const validateRequest = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { 
        abortEarly: false, 
        stripUnknown: true
    });

    if (error) {
        const errorMessages = error.details.map((err) => 
            err.message.replace(/['"]+/g, '')
        );
        return res.status(400).json({ errors: errorMessages });
    }
    
    req.body = value;
    next();
}


export const registerUser = [
    validateRequest(registerSchema), // Bước 1: Validate đầu vào
    async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Bước 2: Kiểm tra email đã tồn tại
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "Email đã tồn tại trong hệ thống." });
            }

            // Bước 3: Mã hóa mật khẩu (10 rounds salt)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Bước 4: Tạo người dùng mới
            const newUser = await UserModel.create({
                name,
                email,
                password: hashedPassword, 
            });

            // Loại bỏ mật khẩu trước khi gửi phản hồi
            const userResponse = newUser.toObject();
            delete userResponse.password;

            res.status(201).json({ 
                message: "Đăng ký thành công!",
                user: userResponse 
            });

        } catch (error) {
            // Xử lý lỗi Mongoose hoặc Server
            res.status(500).json({ message: "Lỗi Server khi đăng ký.", error: error.message });
        }
    }
];
