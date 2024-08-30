import { HydratedDocument, model, Model, Schema } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string
};

interface IUserMethods {
    trySave(): Promise<{ savedUser: HydratedDocument<IUser, IUserMethods>, success: boolean }>;
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
        const savedUser = await this.save();
        const success = (savedUser != null);

        return { savedUser, success };
    }
);

const User = model<IUser, UserModel>("User", userSchema);

export {
    IUser,
    User
};