var base = require('../../src/js/application');

describe('Application', function () {
    
    it('should be defined', function () {
        expect(base).to.be.defined;
    });

    it('method should return true', function () {
    	var app = new base();
    	
        expect(app.run()).to.be.eq(0);
    });
});