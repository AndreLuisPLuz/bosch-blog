import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.status).json({ message: err.message });
    }
};

export default handleError;