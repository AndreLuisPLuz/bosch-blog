import { HydratedDocument, Types } from "mongoose";
import { IUser, IUserMethods } from "../schemas/user.schema";

type ArticleCreateArgs = {
    title: string;
    text: string;
    author: Types.ObjectId | HydratedDocument<IUser, IUserMethods>;
};

export type { ArticleCreateArgs };