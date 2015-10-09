var base = require('../../src/js/application');

describe('Application', function () {
    
    it('should be defined', function () {
        expect(base).to.be.defined;
    });

    it('should run application', function () {
        expect(base.startApplication()).to.be.eq(0);
    });

    it('method should stop application', function () {
        expect(base.stopApplication()).to.be.eq(0);
    });

    it('method should call non existed module', function () {
        base.startModule('');
        expect(base.startModule()).to.be.eq(0);
    });
});