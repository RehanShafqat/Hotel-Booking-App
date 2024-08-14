import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./dbConnection";
import { errorMiddleware } from "./Middlewares/customError";
import userRouter from "./Routes/userRoutes";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json()); // for json formats
app.use(express.urlencoded({ extended: true })); // for req.body
app.use(cookieParser()); // for req.cookie_name
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

dbConnection(); //ensuring db Connection
// app.use(cooki)
app.listen(7000, () => {
  console.log("server is running here at 7000");
});

app.use("/api/user", userRouter); //user Related Routes

app.use(errorMiddleware); // custom Global Error Handler
export default app;
