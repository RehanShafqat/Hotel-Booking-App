import { Request, Response, NextFunction } from "express";
import customError from "../Middlewares/customError";
import userModel, { UserType } from "../Models/user";
import jwt from "jsonwebtoken";
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, userName, password } = req.body;
    if (!email || !userName || !password) {
      return next(new customError("Not all Fields are present", 402));
    }
    //check for available email
    let user = await userModel.findOne({
      email: email,
    });
    if (user) {
      return next(new customError("User Already Exists", 400));
    }

    user = new userModel({ email, userName, password });
    await user.save();

    const token = jwt.sign(
      { user_id: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    //register user
    res
      .cookie("authentication_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // miliseconds
      })
      .status(200)
      .json({
        success: true,
        message: "User registered successfully",
        jwt: token,
      });
  } catch (error) {
    return next(new customError((error as Error).message, 500));
  }
};
