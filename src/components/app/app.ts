import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IArticlesResp } from '../../interfaces';
import { ISourceResp } from '../../interfaces';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document.querySelector('.sources')!.addEventListener('click', (e: Event) => {
            this.controller.getNews(e, (data: IArticlesResp) => {
                this.view.drawNews(data);
                this.removeButtons();
            });
        });

        this.controller.getSources((data: ISourceResp) => {
            const search: Readonly<HTMLInputElement> = document.querySelector('#search') as HTMLInputElement;

            this.view.drawSources(data);
            search!.addEventListener('input', (e) => {
                this.removeButtons();
                this.view.drawSources(data);
                this.findSources(data, search.value);
            });
            document.querySelector('.header__home')?.addEventListener('click', () => {
                this.removeButtons();
                this.removeNews();
                this.view.drawSources(data);
            });
        });
    }

    private findSources(data: ISourceResp, value: string) {
        const allButtons: Readonly<NodeListOf<Element>> = document.querySelectorAll('.source__item');
        if (value != '') {
            allButtons.forEach((item) => {
                if (item.textContent?.toLowerCase().trim().search(value.toLowerCase().trim()) === -1) {
                    item.remove();
                }
            });
        } else {
            this.removeButtons();
            this.view.drawSources(data);
        }
    }
    private removeButtons() {
        const allButtons: Readonly<NodeListOf<Element>> = document.querySelectorAll('.source__item');
        allButtons.forEach((item) => {
            item.remove();
        });
    }
    private removeNews() {
        if (document.querySelector('.news')) {
            document
                .querySelector('.news')
                ?.querySelectorAll('.news__item')
                .forEach((item) => item.remove());
        }
    }
}

export default App;
