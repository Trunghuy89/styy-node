import { Router } from "express";
import authorRouter from "./author.js"; 
import userRouter from "./user.js"; // Import Router cho tính năng User/Auth

const rootRouter = Router();

// Gắn Author API vào tiền tố /api/authors
rootRouter.use('/authors', authorRouter); 

// Gắn User Auth API vào tiền tố /api/auth
// Ví dụ: Đăng ký sẽ là POST /api/auth/register
rootRouter.use('/auth', userRouter); 

export default rootRouter;
