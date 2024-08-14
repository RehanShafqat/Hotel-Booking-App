import { NextFunction, Request, Response } from "express";
import customError from "./customError";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../Models/user";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authentication_token;
  if (!token) {
    return next(new customError("Authentication Failed", 401));
  }
  try {
    const decoded = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    if (decoded) {
      const user_id = (decoded as JwtPayload).user_id;
      const user = await userModel.findOne({ _id: user_id });
      req.body.user_id = user_id;
      next();
    }
  } catch (error) {
    return next(new customError((error as Error).message, 400));
  }
};
export default validateToken;
