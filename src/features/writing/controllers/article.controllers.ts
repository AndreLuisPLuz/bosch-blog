import { Request, Response } from "express";
import { createArticleService } from "../services/article.services";

const CreateArticleController = async (req: Request, res: Response): Promise<Response> => {
    const result = await createArticleService(req.body);
    return res.status(201).json(result);
};

export { CreateArticleController };