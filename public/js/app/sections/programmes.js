import ProgrammeService from '../services/programme.js';

class Programmes {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }
  show(channel) {
    const element = this.createContainer(channel);
    this.createSelectBox(element, channel);

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
    title.classList.add('programme__channel-title');

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
    service
      .get(channel)
      .then(response => {
        this.createList(element, response.data._embedded.programmes);
      })
      .catch(err => {
        this.createRequestError(element, 'Error loading a programme');
      });
  }
  createSelectBox(parent) {
    const selectList = document.createElement('select');
    const listGroup = document.getElementsByClassName('list-group');
    const programmeChannelTitle = document.getElementsByClassName('programme__channel-title');

    const channelsArray = ['itv', 'itv2', 'itv3', 'itv4', 'itvbe', 'citv'];

    selectList.id = 'select-channel';
    selectList.addEventListener('change', event => {
      for (var i = 0; i < listGroup.length; i++) {
        listGroup[i].remove();
      }
      for (var i = 0; i < programmeChannelTitle.length; i++) {
        programmeChannelTitle[i].remove();
      }
      this.createTitle(parent, event.target.value);

      this.loadProgrammes(parent, event.target.value);
    });

    for (let i = 0; i < channelsArray.length; i++) {
      const option = document.createElement('option');
      option.value = channelsArray[i];
      option.text = channelsArray[i];
      selectList.appendChild(option);
    }
    parent.appendChild(selectList);
  }

  createRequestError(element, list) {
    const error = document.createElement('p');

    error.classList.add('request-error');
    error.innerText = list;
    element.appendChild(error);
  }

  createList(element, list) {
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    const fragment = document.createDocumentFragment();
    list.forEach(item => {
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

    const latestProduction = item._embedded.latestProduction;
    const latestProductionEmbedded = item._embedded.latestProduction._embedded;

    // I would have probably used moment here to format,just following the
    const date = new Date(latestProduction.broadcastDateTime.commissioning);
    const day = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const time = hours + ':' + minutes;

    const categories = latestProductionEmbedded.categories;

    const channelName = latestProductionEmbedded.channel.name;
    const channelStrapline = latestProductionEmbedded.channel.strapline;

    const episodes = latestProduction.episode ? latestProduction.episode : 'N/A';

    let str = '';
    let subStr = '';

    str += `<h3 class="list-group__title">${item.title}</h3>`;
    str += `<p class="list-group__synopses">${item.synopses.ninety}</p>`;
    str += `<p class="list-group__duration"><b>Duration</b>: ${
      latestProduction.duration.display
    }</p>`;

    categories.forEach(item => {
      subStr += `<span class="list-group__category-name"> ${item.name}</span>`;
    });

    str += `<p class="list-group__category"><b>Category</b>: ${subStr}</p>`;
    str += `<p class="list-group__broadcast-date"><b>Broadcast date</b>:  <span class="list-group__broadcast-day">${day}</span></p>`;
    str += `<p class="list-group__broadcast-time"><b>Broadcast time</b>:  <span class="list-group__broadcast-hour">${time}</span></p>`;
    str += `<p class="list-group__episode"><b>Episode number</b>: ${episodes}</p>`;
    str += `<p class="list-group__channel"><b>Channel</b>: <span class="list-group__channel-name">${channelName}</span> - <span class="list-group__channel-strapline">${channelStrapline}</span></p>`;

    title.innerHTML = str;
    parent.appendChild(title);
  }
}

export default Programmes;
