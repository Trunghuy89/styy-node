import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // liên kết với collection Category
      required: true,
    },
  },
  {
    timestamps: true, // tự tạo createdAt, updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
