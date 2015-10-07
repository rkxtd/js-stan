var Sandbox = (function() {
    var Exception           = require('./exceptions/BaseException'),
        helpers             = {
            logger  : require('./Logger'),
            _       : require('lodash')
        },
        scope               = {
            private : {},
            public  : {
                helpers : helpers
            }
        },
        constructor         = function () {
            helpers.logger.log('Sandbox created');
        };
    scope.private.types     = [];
    constructor.prototype   = scope.public;

    /**
     * Subscribe for specified event, with binding callBack and passing scope
     * @param eventName {string} Required - event which module want to listen, and fire callBack
     * @param callBack {function} Required - function which will be executed, eventData will be passed as first param
     * @param passedScope {object} Optional. Default: {} - Scope which will be applied to function.
     */
    scope.public.listen = function(eventName, callBack, passedScope) {
        if (typeof(eventName) !== 'string') {
            throw new Exception('core.sandbox.providedTypeNotString');
        }

        if (typeof(callBack) !== 'function') {
            throw new Exception('core.sandbox.providedCallBackNotFunction');
        }

        if (passedScope && typeof(passedScope) !== 'object') {
            throw new Exception('core.sandbox.providedScopeNotAnObject');
        }

        var listener = {
            fn: callBack,
            scope: passedScope || {}
        };

        if (Object.prototype.toString.call() === '[object Array]') {
            scope.private.types[eventName].push(listener);
        } else {
            scope.private.types[eventName] = [listener];
        }
        helpers.logger.log('Event ['+ eventName + '] subscribed');
    };

    scope.public.notify = function(type, data) {
        helpers.logger.log('Notification ['+ type + '] pushed', {}, 1);
        if (!scope.private.types.hasOwnProperty(type)) {
            return ;
        }

        scope.private.types[type].forEach(function(listener) {
            listener.fn.apply(listener.scope, [data]);
        })
    };

    return constructor;
}());

module.exports = Sandbox;