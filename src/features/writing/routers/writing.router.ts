import { Router } from "express";
import articleRouter from "./article.router";
import authenticate from "../../../middlewares/auth.middleware";

const writingRouter = Router();

writingRouter.use(authenticate);
writingRouter.use("/article", articleRouter);

export default writingRouter;