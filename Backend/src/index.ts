import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./dbConnection";
import { errorMiddleware } from "./Middlewares/customError";
import userRouter from "./Routes/userRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

dbConnection();
app.listen(7000, () => {
  console.log("server is running here at 7000");
});

app.use("/api/user", userRouter);

app.use(errorMiddleware);
export default app;
