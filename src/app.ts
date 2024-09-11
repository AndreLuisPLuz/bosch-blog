import "dotenv/config";
import express from "express";
import cors from "cors";
import handleError from "./middlewares/errorHandler.middleware";
import authenticationRouter from "./features/authentication";
import writingRouter from "./features/writing";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == "development")
{
    app.use(cors({ origin: "*" }));
    console.log("[server]: using cors");
}

app.use("/api/v1/auth", authenticationRouter);
app.use("/api/v1/write", writingRouter);

app.use(handleError);

export default app;