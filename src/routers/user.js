import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

// API đăng ký
router.post("/signup", signup);

// API đăng nhập
router.post("/login", login);

export default router;
