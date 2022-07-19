import { ISourceResp } from './../../interfaces';

class Loader {
    baseLink: string;
    options: { apiKey: string };
    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options }: { endpoint: string; options?: {} },
        callback: Function = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options!);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: {}, endpoint: string) {
        const urlOptions: Object = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Function, options: {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: ISourceResp) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
