import { HydratedDocument, Types } from "mongoose";
import { Article, IArticle, IArticleMethods } from "../schemas/article.schema";
import { IUser, IUserMethods } from "../schemas/user.schema";
import { ArticleCreateArgs } from "../types/article.types";

class ArticleEntity {
    private document: HydratedDocument<IArticle, IArticleMethods> = new Article();

    public get id() { return this.document._id }
    public get title() { return this.document.title };
    public get text() { return this.document.text };
    public get author() { return this.document.author };

    public set title(value: string) { this.document.title = value };
    public set text(value: string) { this.document.text = value };
    public set author(value: Types.ObjectId | HydratedDocument<IUser, IUserMethods>) {
        if (value instanceof Types.ObjectId) {
            this.document.author = value;
            return;
        }

        this.document.author = value._id;
    }

    public static createAsync = async (args: ArticleCreateArgs): Promise<ArticleEntity> => {
        const { title, text, author } = args;
        
        const self = new ArticleEntity();
        self.document = await Article.create({ title, text, author });

        return self;
    };

    public static findByIdAsync = async (id: string): Promise<ArticleEntity | null> => {
        const result = await Article.findById(id).populate("author").exec();

        if (result == null)
            return null;
    
        return this.loadFromDocument(result);
    };

    private static loadFromDocument = (document: HydratedDocument<IArticle, IArticleMethods>): ArticleEntity => {
        var article = new ArticleEntity();
        article.document = document;

        return article;
    };
}