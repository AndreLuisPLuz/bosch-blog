import { Router } from "express";
import { CreateArticleController } from "../controllers/article.controllers";

const articleRouter = Router();

articleRouter.post("", CreateArticleController)

export default articleRouter;