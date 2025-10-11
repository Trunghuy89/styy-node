import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng cung cấp tên"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Vui lòng cung cấp email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng cung cấp địa chỉ email hợp lệ",
      ],
    },
    password: {
      type: String,
      required: [true, "Vui lòng cung cấp mật khẩu"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
      select: false, // Không trả password trong query để bảo mật
    },
    passwordChangedAt: Date,

    role: {
      type: String,
      enum: ["customer", "staff", "admin"],
      default: "customer",
    },

    phone: {
      type: String,
      validate: {
        validator: (v) => /^\d{10}$/.test(v), // bắt buộc 10 chữ số
        message: (props) =>
          `${props.value} không phải là số điện thoại hợp lệ!`,
      },
    },

    addresses: [
      {
        street: String,
        city: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    avatar: String,

    active: {
      type: Boolean,
      default: true,
      select: false, // Không trả về trong query (bảo mật)
    },
  },
  {
    timestamps: true, // Thêm createdAt và updatedAt tự động
    versionKey: false, // Loại bỏ __v
  }
);

export const User = mongoose.model("User", userSchema);
