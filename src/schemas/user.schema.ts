import { HydratedDocument, model, Model, Schema, Error } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string
};

interface IUserMethods {
    trySave(): Promise<{ savedDocument: HydratedDocument<IUser, IUserMethods> | null, success: boolean }>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.method(
    "trySave",
    async function trySave() {
        let savedUser: HydratedDocument<IUser, IUserMethods> | null;
        try {
            savedUser = await this.save();
        } catch (err) {
            savedUser = null;
        }

        const success = (savedUser != null);
        return { savedUser, success };
    }
);

const User = model<IUser, UserModel>("User", userSchema);

export {
    IUser,
    IUserMethods,
    User
};