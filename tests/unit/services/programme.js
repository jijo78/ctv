import sinon from 'sinon';
import ProgrammeService from '../../../public/js/app/services/programme.js';

const assert = require('assert');

describe('services > programme', () => {
  let service;

  beforeEach(() => {
    global.axios.get = function() {};
    service = new ProgrammeService();
  });

  afterEach(() => {
    service = undefined;
  });

  it('should make a programme request by channel', () => {
    service.get('citv');
    assert.ok(
      global.axios.get(
        'http://discovery.hubsvc.itv.com/platform/itvonline/browser/programmes?channelId=citv&broadcaster=itv',
        {
          headers: {
            Accept: 'application/vnd.itv.hubsvc.programme.v3+hal+json'
          }
        }
      )
    ).calledOnce;
  });

  it('should return a promise', () => {
    global.axios.get.then(() => {
      return 'promise';
    });
    var promise = service.get('citv');
    assert.equal(promise, 'promise');
  });
});
