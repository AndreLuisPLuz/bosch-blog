import "dotenv/config"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserEntity from "../../../entities/user.entity";

import { AppError } from "../../../errors";
import { LoginAttemptArgs } from "../api/requests/login.requests";
import { LoginToken } from "../api/responses/login.responses";

const loginAttemptService = async (payload: LoginAttemptArgs): Promise<LoginToken> => {
    const user = await UserEntity.findByEmailAsync(payload.email);

    if (!user)
        throw new AppError("Invalid email or password.", 403);

    if (!await bcrypt.compare(payload.password, user.password))
        throw new AppError("Invalid email or password.", 403);

    const secret = process.env.APP_SECRET_KEY;
    const token = jwt.sign(
        { userId: user.id },
        secret!,
        { expiresIn: '1 day' }
    );

    return { jwtToken: token };
};

export { loginAttemptService };