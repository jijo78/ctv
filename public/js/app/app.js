import Programmes from './sections/programmes.js';

class Application {
    create(element) {
        this.programmes = new Programmes(element);
        this.programmes.show('itv');
    }
}

export default Application;
