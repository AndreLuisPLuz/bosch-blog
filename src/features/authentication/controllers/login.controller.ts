import { Request, Response } from "express";
import { loginAttemptService } from "../services/login.service";

const loginAttemptController = async (req: Request, res: Response): Promise<Response> => {
    const result = await loginAttemptService(req.body);
    return res.status(200).json(result);
};

export { loginAttemptController };