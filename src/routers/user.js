import { Router } from "express";
import { registerUser } from "../controllers/user.js";

const userRouter = Router();

// POST /api/auth/register
userRouter.post("/register", registerUser);

export default userRouter;
