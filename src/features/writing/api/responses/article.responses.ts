type CreateArticleResponse = {
    id: string;
    title: string;
    author: {
        id: string;
        name: string;
    }
}

export type { CreateArticleResponse };