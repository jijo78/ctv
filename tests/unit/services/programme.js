import sinon from 'sinon';
import axios from 'axios';
import ProgrammeService from '../../../public/js/app/services/programme.js';

const assert = require('assert');

describe('services > programme', () => {
  let service;

  beforeEach(() => {
    global.axios = sinon.spy();
    service = new ProgrammeService();
  });

  afterEach(() => {
    service = undefined;
  });

  it('should make a programme request by channel', () => {
    service.get('citv');
    assert.ok(
      global.axios.withArgs({
        method: 'get',
        url:
          'http://discovery.hubsvc.itv.com/platform/itvonline/browser/programmes?channelId=citv&broadcaster=itv',
        headers: sinon.match.object
      }).calledOnce
    );
  });

  it('should return a promise', () => {
    global.axios = function() {
      return 'promise';
    };
    var promise = service.get('citv');
    assert.equal(promise, 'promise');
  });
});
