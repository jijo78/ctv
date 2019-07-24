import sinon from 'sinon';
import assert from 'assert';
import { JSDOM } from 'jsdom';
import jsonProgrammes from '../../mocks/programmes.json';
import Programmes from '../../../public/js/app/sections/programmes.js';
import * as ProgrammeService from '../../../public/js/app/services/programme.js';

describe('sections > programmes', () => {
  let section;
  let parentElement;
  let dom;
  let document;
  let programmeServiceStub;
  let buttonClickSuccessSpy;

  beforeEach(() => {
    programmeServiceStub = sinon.stub(ProgrammeService, 'default').callsFake(function() {
      return {
        get: () => {
          return Promise.resolve({ data: jsonProgrammes });
        }
      };
    });
    dom = new JSDOM(`<!DOCTYPE html><div class="app"/>`);
    document = global.document = dom.window.document;
    global.axios.get = function() {};
    parentElement = dom.window.document.querySelector('.app');
    section = new Programmes(parentElement);

    buttonClickSuccessSpy = sinon.spy();
  });

  afterEach(() => {
    programmeServiceStub.restore();
    section = undefined;
    parentElement = undefined;
    dom = undefined;
    document = undefined;
    programmeServiceStub = undefined;
  });

  it('should render a select channel dropdown with 6 channels options', done => {
    section.show('citv');

    setTimeout(() => {
      try {
        assert.equal(document.getElementById('select-channel').length, 6, 'Number of options');
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should create a title', () => {
    section.show('citv');
    assert.equal(document.querySelector('.programmes__citv h1').innerHTML, 'CITV Channel');
  });

  it('should update the title text and class if channel is different', () => {
    section.show('itv');
    assert.equal(document.querySelector('.programmes__itv h1').innerHTML, 'ITV Channel');
  });

  it('should render a list of programmes', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.programmes__citv li').length,
          5,
          'Number of items rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render a list of programmes with relative images', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.programmes__citv li img').length,
          5,
          'Number of images rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the programme title', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.list-group__title').length,
          5,
          'Number of titles rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the programme title text', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelector('.list-group__title').innerHTML,
          "Who's Doing the Dishes"
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the programme synopses', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.list-group__synopses').length,
          5,
          'Number of synopses rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the programme duration', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.list-group__duration').length,
          5,
          'Number of programme duration rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the programme category', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.list-group__category').length,
          5,
          'Number of programme duration rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render all the category names if more than one is available ', done => {
    section.show('citv');

    setTimeout(() => {
      try {
        // retrieving the third element as it has more than one category name
        const category = document.getElementsByClassName('list-group__category');
        const categoryInner = category[3].querySelectorAll('.list-group__category-name');

        assert.equal(categoryInner.length, 2, 'Number of categories name rendered');
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the programme broadcast date', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.list-group__broadcast-date').length,
          5,
          'Number of programme broadcast date rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should format the programme broadcast date correctly', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(document.querySelector('.list-group__broadcast-day').innerHTML, '5/2/2018');
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the programme broadcast time', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.list-group__broadcast-time').length,
          5,
          'Number of programme broadcast time rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should format the programme broadcast time correctly', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(document.querySelector('.list-group__broadcast-hour').innerHTML, '10:10');
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the programme episode number', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.list-group__episode').length,
          5,
          'Number of programme episode number rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the Channel info', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelectorAll('.list-group__channel').length,
          5,
          'Number of programme episode number rendered'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the Channel name', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(document.querySelector('.list-group__channel-name').innerHTML, 'ITV2');
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });

  it('should render the Channel strapline', done => {
    section.show('citv');
    setTimeout(() => {
      try {
        assert.equal(
          document.querySelector('.list-group__channel-strapline').innerHTML,
          'TV. And then some.'
        );
        done();
      } catch (err) {
        done(err);
      }
    }, 300);
  });
});
