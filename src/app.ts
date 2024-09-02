import "dotenv/config";
import express from "express";
import cors from "cors";
import handleError from "./middlewares/errorHandler.middleware";
import { registerRouter } from "./features/authentication";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == "development")
{
    app.use(cors({ origin: "*" }));
    console.log("[server]: using cors");
}

app.use("/register", registerRouter);

app.use(handleError);

export default app;