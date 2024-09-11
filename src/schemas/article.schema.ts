import { HydratedDocument, model, Model, Schema, Types } from "mongoose";
import { IUser, IUserMethods } from "./user.schema";

interface IArticle {
    title: string;
    text: string;
    author: Types.ObjectId | HydratedDocument<IUser, IUserMethods>;
}

interface IArticleMethods {
    trySave(): Promise<{ savedDocument: HydratedDocument<IArticle, IArticleMethods> | null, success: boolean }>;
}

type ArticleModel = Model<IArticle, {}, IArticleMethods>;

const articleSchema = new Schema<IArticle, ArticleModel, IArticleMethods>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

articleSchema.method(
    "trySave",
    async function trySave() {
        let savedArticle: HydratedDocument<IArticle, IArticleMethods> | null;
        try {
            savedArticle = await this.save();
        } catch (err) {
            savedArticle = null;
        }

        const success = (savedArticle != null);
        return { savedArticle, success };
    }
);


const Article = model<IArticle, ArticleModel>("Article", articleSchema);

export {
    IArticle,
    IArticleMethods,
    Article
};