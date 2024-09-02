import { Request, Response } from "express";
import { registerUserService } from "../services/register.service";

const registerUserController = async (req: Request, res: Response): Promise<Response> => {
    const result = await registerUserService(req.body);
    return res.status(201).json(result);
};

export { registerUserController };