var Sandbox = (function() {
    var Exception = require('./exceptions/BaseException');
    var _ = require('lodash');
    var privateScope = {
        types: {}
    };
    var publicScope = {};

    var func = function () {
        console.log('Sandbox created');
    };
    func.prototype = publicScope;

    publicScope.sayHi = function() {
        console.log('Hi this is Sandbox');
    };

    publicScope.listen = function(type, callBack) {
        if (typeof(type) !== 'string') {
            throw new Exception('core.sandbox.providedTypeNotString');
        }

        if (typeof(callBack) !== 'function') {
            throw new Exception('core.sandbox.providedCallBackNotFunction');
        }

        if (Object.prototype.toString.call() === '[object Array]') {
            privateScope.types[type].push(callBack);
        } else {
            privateScope.types[type] = [callBack];
        }
        console.log('Event ['+ type + '] subscribed');
    };

    publicScope.notify = function(type, data) {
        console.log('Notification ['+ type + '] pushed');
        if (!privateScope.types.hasOwnProperty(type)) {
            return ;
        }

        privateScope.types[type].forEach(function(callBack) {
            callBack.apply({}, [data]);
        })
    };

    return func;
}());

module.exports = Sandbox;