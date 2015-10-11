var base = require('../../src/js/application');

describe('Application', function () {
    
    it('should be defined', function () {
        expect(base).to.be.defined;
    });

    it('should run application', function () {
        expect(base.startApplication()).to.be.eq(0);
    });

    it('method should call non existed module', function () {
        expect(base.startModule('non-exist')).to.be.eq(0);
    });
    it('method should call non existed check', function () {
        expect(base.check({
                moduleId: 'test'
            },
            false,
            'invalidCheck'
        )).to.be.eq(false);
    });

    it('method should stop application', function () {
        expect(base.stopApplication()).to.be.eq(0);
    });
});