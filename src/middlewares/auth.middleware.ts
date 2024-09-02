import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";
import UserEntity from "../entities/user.entity";

const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken)
        throw new AppError("Missing bearer token.", 401);

    const [_bearer, token] = authToken.split(" ");

    verify(token, process.env.APP_SECRET_KEY!,
        (err: any, decoded: any) => {
            if (err)
                throw new AppError(err.message, 401);
        
            res.locals.userId = decoded.userId;
        }
    );

    const user = UserEntity.findById(res.locals.userId);

    if (!user) {
        throw new AppError("Claimed user not found.", 404);
    }

    return next();
};

export default authenticate;