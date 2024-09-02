import "dotenv/config";
import bcrypt from "bcryptjs";

import { HydratedDocument } from "mongoose";
import { IUser, IUserMethods, User } from "../schemas/user.schema";
import { CreateUserArgs } from "../types/user.types";

class UserEntity {
    private document: HydratedDocument<IUser, IUserMethods> = new User();

    public get id() { return this.document._id }
    public get name() { return this.document.name }
    public get email() { return this.document.email }
    public get password() { return this.document.password }

    public set name(value: string) { this.document.name = value }
    public set email(value: string) { this.document.email = value }
    public set password(value: string) { this.document.password = UserEntity.hashPassword(value) }

    public static createAsync = async(args: CreateUserArgs): Promise<UserEntity> => {
        const { name, email, password } = args;
        const hashedPassword = await this.hashPasswordAsync(password);

        const self = new UserEntity();
        self.document = await User.create({ name, email, password: hashedPassword });

        return self;
    };

    public saveAsync = async(): Promise<[UserEntity | null, boolean]> => {
        const result = await this.document.trySave();
        if (!result.success)
            return [ null, false ];

        return [ this, true ];
    };

    public static findById = async (id: string): Promise<UserEntity | null> => {
        const result = await User.findById(id).exec();

        if (result == null)
            return null;

        return this.loadFromDocument(result);
    };

    public static findByEmailAsync = async (email: string): Promise<UserEntity | null> => {
        const result = await User.findOne({
            email: { $regex: email, $options: "i" }
        }).exec();

        if (result == null)
            return null;

        return this.loadFromDocument(result);
    };

    private static loadFromDocument = (document: HydratedDocument<IUser, IUserMethods>): UserEntity => {
        var user = new UserEntity();
        user.document = document;

        return user;
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