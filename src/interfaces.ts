export interface ISourceRequest {
    name: string;
    id: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
export interface ISourceResp {
    sources: Array<ISourceRequest>;
}

export interface IArticleRequest {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}

export interface IArticlesResp {
    articles: Array<IArticleRequest>;
}
