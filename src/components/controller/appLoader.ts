import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '03b6487749134db3bca39860611ca55b',
        });
    }
}

export default AppLoader;
