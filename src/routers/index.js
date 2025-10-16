import express from "express";
import userRouter from "./user.js"; // ✅ import đúng file router, KHÔNG phải model

const router = express.Router();

router.use("/auth", userRouter); // ✅ /api/auth/signup, /api/auth/login

export default router;
