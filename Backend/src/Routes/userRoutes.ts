import express from "express";
import {
  getUserDetails,
  loginUser,
  registerUser,
} from "../Controllers/userController";
import validateToken from "../Middlewares/auth";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUserDetails", validateToken, getUserDetails);

export default userRouter;
