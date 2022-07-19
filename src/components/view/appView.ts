import News from './news/news';
import Sources from './sources/sources';
import { IArticlesResp } from '../../interfaces';
import { IArticleRequest } from '../../interfaces';
import { ISourceResp } from '../../interfaces';
import { ISourceRequest } from '../../interfaces';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IArticlesResp) {
        if (data) {
            const { articles } = data;
            this.news.draw(articles);
        } else this.news.draw([]);
    }

    drawSources(data: ISourceResp) {
        const values: Array<ISourceRequest> = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
