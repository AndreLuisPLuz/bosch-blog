import ArticleEntity from "../../../entities/article.entity";
import UserEntity from "../../../entities/user.entity";
import { AppError } from "../../../errors";
import { CreateArticlePayload } from "../api/requests/article.requests";
import { CreateArticleResponse } from "../api/responses/article.responses";

const createArticleService = async (payload: CreateArticlePayload): Promise<CreateArticleResponse> => {
    const author = await UserEntity.findByIdAsync(payload.authorId);
    
    if (author == null)
        throw new AppError("Author not found.", 404);

    const newArticle = await ArticleEntity.createAsync({
        title: payload.title,
        text: payload.text,
        author: author.id
    });

    return {
        id: newArticle.id.toString(),
        title: newArticle.title,
        author: {
            id: author.id.toString(),
            name: author.name
        }
    }
};

export { createArticleService };