import "dotenv/config";
import bcrypt from "bcryptjs";

import { HydratedDocument } from "mongoose";
import { IUser, IUserMethods, User } from "../schemas/user.schema";
import { CreateUserArgs } from "../types/user.types";

class UserEntity {
    private document: HydratedDocument<IUser, IUserMethods> = new User();

    public get name() { return this.document.name }
    public get email() { return this.document.email }
    public get password() { return this.document.password }

    public set name(value: string) { this.document.name = value }
    public set email(value: string) { this.document.email = value }
    public set password(value: string) { this.document.password = UserEntity.hashPassword(value) }

    public static createAsync = async(args: CreateUserArgs): Promise<UserEntity> => {
        const { name, email, rawPassword } = args;
        const hashedPassword = await this.hashPasswordAsync(rawPassword);

        const self = new UserEntity();
        self.document = await User.create({ name, email, password: hashedPassword });

        return self;
    };

    public saveAsync = async(): Promise<{savedUser: UserEntity, success: boolean}> => {
        const result = await this.document.trySave();
        
    };

    private static hashPasswordAsync = async(rawPassword: string): Promise<string> => {
        const numSaltRounds = process.env.NODE_ENV == "development" ? 1 : 16;
        const salt = await bcrypt.genSalt(numSaltRounds);
        const passwordHash = await bcrypt.hash(rawPassword, salt);

        return passwordHash;
    };

    private static hashPassword = (rawPassword: string): string => {
        const numSaltRounds = process.env.NODE_ENV == "development" ? 1 : 16;
        const salt = bcrypt.genSaltSync(numSaltRounds);
        const passwordHash = bcrypt.hashSync(rawPassword, salt);

        return passwordHash;
    };
}

export default UserEntity;