import express from "express";
const router = express.Router();

// Mảng products mẫu (tách biệt với posts nên không xung đột)
const products = [
  { id: 1, name: "sách mkt", price: 100 },
  { id: 2, name: " sách lập trình", price: 200 }
];

// GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

// Ví dụ thêm POST /api/products
router.post("/", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

export default router;


