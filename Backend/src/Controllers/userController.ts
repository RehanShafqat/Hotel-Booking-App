import { Request, Response, NextFunction } from "express";
import customError from "../Middlewares/customError";
import userModel, { UserType } from "../Models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return next(new customError("Enter All Credentials", 404));
    }

    //find User in the database
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return next(new customError("User not found", 404));
    }

    //check for password match
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);

    if (isPasswordCorrect) {
      const token = await jwt.sign(
        { user_id: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .cookie("authentication_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: "User logged in successfully",
          user,
          token,
        });
    } else {
      return next(new customError("Invalid Credentials", 401));
    }
  } catch (error) {
    return next(new customError((error as Error).message, 500));
  }
};
