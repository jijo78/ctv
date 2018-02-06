import ProgrammeService from '../services/programme.js';

class Programmes {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }
    show(channel) {
        const element = this.createContainer(channel);
        this.createTitle(element, channel);
        this.loadProgrammes(element, channel);
    }
    createContainer(channel) {
        this.disposeContainer();
        const container = document.createElement('div');
        container.classList.add('programmes');
        container.classList.add(`programmes__${channel}`);
        this.parentElement.appendChild(container);
        return container;
    }
    createTitle(element, channel) {
        const title = document.createElement('h1');
        title.textContent = `${channel.toUpperCase()} Channel`;
        element.appendChild(title);
    }
    disposeContainer() {
        const element = this.parentElement.querySelector('.programmes');
        if (element) {
            parentElement.removeChild(element);
        }
    }
    loadProgrammes(element, channel) {
        const service = new ProgrammeService();
        service.get(channel)
            .then((response) => {
                this.createList(element, response.data._embedded.programmes);
            })
            .catch((err) => {
                console.log('Error loading a programme', err);
            });
    }
    createList(element, list) {
        const ul = document.createElement('ul');
        ul.classList.create('list-group');
        const fragment = document.createDocumentFragment();
        list.forEach((item) => {
            this.appendItem(fragment, item);
        });
        ul.appendChild(fragment);
        element.appendChild(ul);
    }
    appendImage(parent, item) {
        const img = document.createElement('img');
        let url = item._embedded.latestProduction._links.image.href;
        url = url.replace('{quality}', 80);
        url = url.replace('{width}', 400);
        img.setAttribute('src', url);
        parent.appendChild(img);
    }
    appendItem(parent, item) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        this.appendImage(li, item);
        this.appendText(li, item);
        parent.appendChild(li);
    }
    appendText(parent, item) {
        const title = document.createElement('div');
        let str = '';
        str += `<h3>${item.title}</h3>`;
        str += `<p>${item.synopses.ninety}</p>`;
        str += `<p><b>Duration</b>: ${item._embedded.latestProduction.duration.display}</p>`;
        title.innerHTML = str;
        parent.appendChild(title);
    }
}

export default Programmes;
