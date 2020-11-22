import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/JWT", { useMongoClient: true });
} else {
  mongoose.connect("mongodb://localhost/JWT", { useMongoClient: true });
}

const app = express();

app.use(cors());
// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());

// Routes
app.use("/users", userRouter);

export default app;
