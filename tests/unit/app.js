import sinon from 'sinon';
import Application from '../../public/js/app/app.js'
import * as Programmes from '../../public/js/app/sections/programmes.js';

const assert = require('assert');

describe('app', () => {

    let app;
    let programmesStub;
    let programmesClassStub;

    beforeEach(() => {
        global.axios = function(){};
        programmesStub = sinon.stub({
            show: () => {}
        });
        programmesClassStub = sinon.stub(Programmes, 'default').callsFake(function() {
            return programmesStub;
        });
        app = new Application();
    });

    afterEach(() => {
        programmesClassStub.restore();
        app = undefined;
        programmesStub = undefined;
        programmesClassStub = undefined;
    });

    it('should create a programme section', () => {
        const element = 'parent element';
        app.create(element);
        assert.ok(programmesClassStub.withArgs(element).calledOnce);
    });

    it('should show programmes for a channel', () => {
        const element = 'parent element';
        app.create(element);
        assert.ok(programmesStub.show.withArgs('itv').calledOnce);
    });

});
